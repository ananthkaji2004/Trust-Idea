"use client";

import type { User } from "@supabase/supabase-js";
import { STORAGE_KEYS } from "@/lib/demoData";
import type {
  BrandResult,
  FalVisualAsset,
  StoredProject,
  TrustMetric,
} from "@/lib/types";
import { getSupabaseBrowserClient, isSupabaseEnvReady } from "@/src/lib/supabase";
import type {
  SaveProjectInput,
  SaveResult,
  StoredProjectRecord,
  UserPreferenceRow,
  VisualAssetRow,
} from "@/src/lib/types";

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota issues */
  }
}

function readLocalProjects(): StoredProject[] {
  if (typeof window === "undefined") return [];
  return parseJson<StoredProject[]>(window.localStorage.getItem(STORAGE_KEYS.savedProjects), []);
}

function upsertLocalProject(project: StoredProject) {
  const list = readLocalProjects();
  const next = [project, ...list.filter((p) => p.id !== project.id)].slice(0, 100);
  writeJson(STORAGE_KEYS.savedProjects, next);
}

function removeLocalProject(projectId: string) {
  const list = readLocalProjects().filter((p) => p.id !== projectId);
  writeJson(STORAGE_KEYS.savedProjects, list);
}

function toStoredProjectRecord(project: StoredProject): StoredProjectRecord {
  return { ...project, source: "local" };
}

function buildVisualRows(input: SaveProjectInput): Array<Omit<VisualAssetRow, "created_at">> {
  return input.visuals.map((asset, index) => ({
    id: `${input.projectId}-${index}-${asset.id}`,
    project_id: input.projectId,
    user_id: input.userId,
    type: asset.id.split("-")[0] ?? "unknown",
    title: asset.label,
    prompt: asset.prompt,
    image_url: asset.imageUrl,
    status: asset.imageUrl ? "ready" : "fallback",
  }));
}

function projectFromSupabaseRow(
  row: {
    id: string;
    created_at: string;
    input_data: unknown;
    brand_data: unknown;
  },
  visuals: FalVisualAsset[]
): StoredProjectRecord | null {
  const form = row.input_data;
  const brand = row.brand_data;
  if (!form || typeof form !== "object") return null;
  if (!brand || typeof brand !== "object") return null;

  return {
    id: row.id,
    createdAt: row.created_at,
    form: form as StoredProject["form"],
    brand: brand as BrandResult,
    visuals,
    source: "supabase",
  };
}

function visualsFromRows(rows: VisualAssetRow[]): FalVisualAsset[] {
  return rows.map((row, index) => ({
    id: `${row.type}-${index}`,
    label: row.title,
    prompt: row.prompt,
    imageUrl: row.image_url,
    gradient: "from-violet-700/85 via-purple-950 to-black",
    caption: row.image_url ? `${row.title} · generated via Fal.` : `${row.title} · fallback visual.`,
  }));
}

export async function upsertProfileForUser(user: User): Promise<SaveResult> {
  if (!isSupabaseEnvReady()) {
    return { ok: false, source: "local", message: "Supabase env missing." };
  }
  try {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email ?? null,
        full_name:
          (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name)
          || (typeof user.user_metadata?.name === "string" && user.user_metadata.name)
          || null,
        avatar_url:
          (typeof user.user_metadata?.avatar_url === "string" && user.user_metadata.avatar_url)
          || null,
      },
      { onConflict: "id" }
    );
    if (error) {
      return { ok: false, source: "local", message: error.message };
    }
    return { ok: true, source: "supabase" };
  } catch {
    return { ok: false, source: "local", message: "Profile sync failed." };
  }
}

export async function saveUserPreferences(
  userId: string,
  prefs: { language?: string | null; theme?: string | null }
): Promise<SaveResult> {
  if (!userId || !isSupabaseEnvReady()) return { ok: false, source: "local" };
  try {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("user_preferences").upsert(
      {
        user_id: userId,
        language: prefs.language ?? null,
        theme: prefs.theme ?? null,
      },
      { onConflict: "user_id" }
    );
    if (error) return { ok: false, source: "local", message: error.message };
    return { ok: true, source: "supabase" };
  } catch {
    return { ok: false, source: "local", message: "Preference save failed." };
  }
}

export async function loadUserPreferences(userId: string): Promise<UserPreferenceRow | null> {
  if (!userId || !isSupabaseEnvReady()) return null;
  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function saveProjectBundle(input: SaveProjectInput): Promise<SaveResult> {
  const localProject: StoredProject = {
    id: input.projectId,
    createdAt: input.createdAt ?? new Date().toISOString(),
    form: input.form,
    brand: input.brand,
    visuals: input.visuals,
  };
  upsertLocalProject(localProject);
  if (typeof window !== "undefined") {
    writeJson(STORAGE_KEYS.currentProject, localProject);
  }

  if (!input.userId || !isSupabaseEnvReady()) {
    return { ok: true, source: "local", message: "Saved locally." };
  }

  try {
    const theme =
      typeof window !== "undefined" ? window.localStorage.getItem("theme") ?? "dark" : "dark";

    const supabase = getSupabaseBrowserClient();
    const trustMetrics: TrustMetric[] = input.brand.trustScore.metrics ?? [];
    const { error: projectError } = await supabase.from("projects").upsert(
      {
        id: input.projectId,
        user_id: input.userId,
        title: input.title,
        business_idea: input.form.businessIdea,
        input_data: input.form,
        brand_data: input.brand,
        trust_score: {
          overall: input.brand.trustScore.overall,
          metrics: trustMetrics,
          suggestionCount: input.brand.trustScore.suggestions.length,
        },
        language: input.form.language,
        theme,
      },
      { onConflict: "id" }
    );
    if (projectError) {
      return { ok: true, source: "local", message: projectError.message };
    }

    const { error: deleteError } = await supabase
      .from("visual_assets")
      .delete()
      .eq("project_id", input.projectId)
      .eq("user_id", input.userId);
    if (deleteError) {
      return { ok: true, source: "local", message: deleteError.message };
    }

    const rows = buildVisualRows(input);
    if (rows.length) {
      const { error: visualError } = await supabase.from("visual_assets").insert(rows);
      if (visualError) {
        return { ok: true, source: "local", message: visualError.message };
      }
    }

    return { ok: true, source: "supabase" };
  } catch {
    return { ok: true, source: "local", message: "Supabase unavailable; local fallback kept." };
  }
}

export async function loadProjects(userId?: string | null): Promise<StoredProjectRecord[]> {
  const local = readLocalProjects().map(toStoredProjectRecord);
  if (!userId || !isSupabaseEnvReady()) return local;

  try {
    const supabase = getSupabaseBrowserClient();
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, created_at, input_data, brand_data")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(100);

    if (error || !projects?.length) return local;

    const projectIds = projects.map((p) => p.id);
    const { data: assets, error: assetsError } = await supabase
      .from("visual_assets")
      .select("*")
      .eq("user_id", userId)
      .in("project_id", projectIds)
      .order("created_at", { ascending: true });

    if (assetsError) return local;

    const assetByProject = new Map<string, VisualAssetRow[]>();
    (assets ?? []).forEach((asset) => {
      const list = assetByProject.get(asset.project_id) ?? [];
      list.push(asset);
      assetByProject.set(asset.project_id, list);
    });

    const mapped = projects
      .map((row) => {
        const visuals = visualsFromRows(assetByProject.get(row.id) ?? []);
        return projectFromSupabaseRow(row, visuals);
      })
      .filter((p): p is StoredProjectRecord => Boolean(p));

    return mapped.length ? mapped : local;
  } catch {
    return local;
  }
}

export async function deleteProject(userId: string | null | undefined, projectId: string): Promise<SaveResult> {
  removeLocalProject(projectId);

  if (!userId || !isSupabaseEnvReady()) {
    return { ok: true, source: "local" };
  }

  try {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("projects").delete().eq("id", projectId).eq("user_id", userId);
    if (error) {
      return { ok: false, source: "local", message: error.message };
    }
    return { ok: true, source: "supabase" };
  } catch {
    return { ok: false, source: "local", message: "Delete failed in Supabase." };
  }
}

export function setCurrentProject(project: StoredProjectRecord | StoredProject) {
  const doc: StoredProject = {
    id: project.id,
    createdAt: project.createdAt,
    form: project.form,
    brand: project.brand,
    visuals: project.visuals,
  };
  writeJson(STORAGE_KEYS.currentProject, doc);
  upsertLocalProject(doc);
}
