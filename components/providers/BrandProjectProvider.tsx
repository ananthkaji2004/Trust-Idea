"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEYS, blueprintToBrandResult, generateBrandBlueprint } from "@/lib/demoData";
import { defaultFormValues, urbanBrewCeylon } from "@/lib/sample-data";
import type {
  BrandBlueprintPayload,
  BrandFormValues,
  BrandResult,
  FalVisualAsset,
  StoredProject,
} from "@/lib/types";

type BrandProjectState = {
  form: BrandFormValues | null;
  brand: BrandResult | null;
  visuals: FalVisualAsset[];
  blueprint: BrandBlueprintPayload | null;
  projectId: string | null;
  createdAt: string | null;
  isHydrated: boolean;
  setBundle: (
    bundle: Omit<StoredProject, "id" | "createdAt"> & Partial<Pick<StoredProject, "id" | "createdAt">>
  ) => void;
  resetUrbanDemo: () => void;
};

const BrandProjectContext = createContext<BrandProjectState | null>(null);

function readJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function persistCurrent(project: StoredProject | null) {
  if (!project || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.currentProject, JSON.stringify(project));
  } catch {
    /* storage full */
  }
}

export function BrandProjectProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundleState] = useState<StoredProject | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const parsed = readJson<StoredProject | null>(window.localStorage.getItem(STORAGE_KEYS.currentProject), null);
    if (parsed?.brand && parsed.form) {
      const normalized: StoredProject = {
        ...parsed,
        visuals: Array.isArray(parsed.visuals) ? parsed.visuals : [],
      };
      setBundleState(normalized);
    } else {
      const seeded: StoredProject = {
        id: "seed-demo",
        createdAt: new Date().toISOString(),
        form: defaultFormValues,
        brand: urbanBrewCeylon,
        visuals: [],
      };
      persistCurrent(seeded);
      setBundleState(seeded);
    }
    setHydrated(true);
  }, []);

  const setBundle = useCallback(
    (next: Omit<StoredProject, "id" | "createdAt"> & Partial<Pick<StoredProject, "id" | "createdAt">>) => {
      const complete: StoredProject = {
        id: next.id ?? crypto.randomUUID(),
        createdAt: next.createdAt ?? new Date().toISOString(),
        form: next.form,
        brand: next.brand,
        visuals: next.visuals ?? [],
      };
      persistCurrent(complete);
      upsertIndexedProject(complete);
      setBundleState(complete);
    },
    []
  );

  const resetUrbanDemo = useCallback(() => {
    const seeded: StoredProject = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      form: defaultFormValues,
      brand: urbanBrewCeylon,
      visuals: [],
    };
    persistCurrent(seeded);
    setBundleState(seeded);
  }, []);

  const blueprint = useMemo(() => {
    if (!bundle?.form) return null;
    try {
      return generateBrandBlueprint(bundle.form);
    } catch {
      return null;
    }
  }, [bundle?.form]);

  const value = useMemo<BrandProjectState>(
    () => ({
      form: bundle?.form ?? defaultFormValues,
      brand: bundle?.brand ?? urbanBrewCeylon,
      visuals: bundle?.visuals ?? [],
      blueprint,
      projectId: bundle?.id ?? null,
      createdAt: bundle?.createdAt ?? null,
      isHydrated: hydrated,
      setBundle,
      resetUrbanDemo,
    }),
    [bundle, blueprint, hydrated, resetUrbanDemo, setBundle]
  );

  return <BrandProjectContext.Provider value={value}>{children}</BrandProjectContext.Provider>;
}

export function useBrandProject(): BrandProjectState {
  const ctx = useContext(BrandProjectContext);
  if (!ctx) {
    throw new Error("useBrandProject requires BrandProjectProvider");
  }
  return ctx;
}

export function hydrateBrandBundle(
  blueprint: BrandBlueprintPayload,
  form: BrandFormValues,
  visuals: FalVisualAsset[]
): { brand: BrandResult; visuals: FalVisualAsset[] } {
  return {
    brand: blueprintToBrandResult(blueprint, form, visuals),
    visuals,
  };
}

export function upsertIndexedProject(project: StoredProject) {
  if (typeof window === "undefined") return;
  try {
    const list = readJson<StoredProject[]>(window.localStorage.getItem(STORAGE_KEYS.savedProjects), []);
    const without = list.filter((p) => p.id !== project.id);
    const next = [{ ...project, visuals: project.visuals ?? [] }, ...without].slice(0, 50);
    window.localStorage.setItem(STORAGE_KEYS.savedProjects, JSON.stringify(next));
  } catch {
    /* quota */
  }
}

export function deleteIndexedProject(projectId: string) {
  if (typeof window === "undefined") return;
  const list = readJson<StoredProject[]>(window.localStorage.getItem(STORAGE_KEYS.savedProjects), []);
  const next = list.filter((p) => p.id !== projectId);
  window.localStorage.setItem(STORAGE_KEYS.savedProjects, JSON.stringify(next));
}

export function loadIndexedProjects(): StoredProject[] {
  if (typeof window === "undefined") return [];
  return readJson<StoredProject[]>(window.localStorage.getItem(STORAGE_KEYS.savedProjects), []);
}
