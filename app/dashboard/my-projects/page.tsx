"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { useToast } from "@/components/providers/ToastProvider";
import { deleteProject, loadProjects, setCurrentProject } from "@/src/lib/database";
import type { StoredProjectRecord } from "@/src/lib/types";

function formatRelative(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default function MyProjectsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [projects, setProjects] = useState<StoredProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      const next = await loadProjects(user?.id);
      if (!cancelled) {
        setProjects(next);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const hasSupabase = useMemo(() => projects.some((p) => p.source === "supabase"), [projects]);

  const handleOpen = (project: StoredProjectRecord) => {
    setCurrentProject(project);
    showToast("Project loaded into workspace.");
    router.push("/dashboard");
  };

  const handleDelete = async (projectId: string) => {
    const res = await deleteProject(user?.id, projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (!res.ok) {
      showToast(res.message ?? "Could not delete from cloud; removed locally.", "info");
    } else {
      showToast("Project deleted.");
    }
  };

  return (
    <>
      <DashboardSectionHeader
        title="My Projects"
        description="All your brand projects in one place. Supabase sync when available, local fallback always."
      />

      {loading ? (
        <div className="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((k) => (
            <article key={k} className="glass-card h-44 animate-pulse" />
          ))}
        </div>
      ) : null}

      {!loading && !projects.length ? (
        <article className="glass-card max-w-3xl p-6">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">No saved projects yet</h2>
          <p className="trust-copy mt-2">
            Create your first brand reality in the Create flow. We will keep it in local storage and sync to Supabase
            automatically when available.
          </p>
        </article>
      ) : null}

      {!loading && projects.length ? (
        <>
          <p className="mb-4 text-xs text-zinc-500">
            Source: {hasSupabase ? "Supabase + local cache" : "Local fallback"}
          </p>
          <ul className="grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <article className="glass-card trust-card-hover flex min-h-[210px] flex-col justify-between p-5">
                  <div>
                    <p className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-white">
                      {project.brand.name}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{formatRelative(project.createdAt)}</p>
                    <p className="mt-3 line-clamp-3 text-xs text-zinc-600 dark:text-zinc-400">
                      {project.form.businessIdea}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpen(project)}
                      className="trust-button-primary min-h-9 flex-1 text-xs"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(project.id)}
                      className="trust-button-secondary min-h-9 flex-1 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
