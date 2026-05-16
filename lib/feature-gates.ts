import { dashboardRoutes } from "@/lib/dashboard-routes";

export const DEMO_ACTION_LIMIT = 3;
export const DEMO_STORAGE_KEY = "trust-idea-demo-actions";

export const gatedRoutes = [
  dashboardRoutes.createNew,
  dashboardRoutes.export,
  dashboardRoutes.falVisualLab,
  dashboardRoutes.myProjects,
  dashboardRoutes.multilingual,
  dashboardRoutes.brandKit,
] as const;

export type GatedActionId =
  | "start-project"
  | "export-kit"
  | "run-trust-score"
  | "generate-visual"
  | "upgrade-pro"
  | "save-project"
  | "next-step";

export const gatedActionIds: GatedActionId[] = [
  "start-project",
  "export-kit",
  "run-trust-score",
  "generate-visual",
  "upgrade-pro",
  "save-project",
  "next-step",
];

export function isGatedRoute(pathname: string): boolean {
  return gatedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function readDemoActionCount(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(DEMO_STORAGE_KEY);
  const parsed = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function incrementDemoActionCount(): number {
  const next = readDemoActionCount() + 1;
  localStorage.setItem(DEMO_STORAGE_KEY, String(next));
  return next;
}

export function clearDemoActionCount(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DEMO_STORAGE_KEY);
}
