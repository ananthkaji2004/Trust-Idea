export const dashboardRoutes = {
  overview: "/dashboard",
  createNew: "/dashboard/create-new",
  myProjects: "/dashboard/my-projects",
  falVisualLab: "/dashboard/fal-visual-lab",
  brandKit: "/dashboard/brand-kit",
  brandReality: "/dashboard/brand-reality",
  trustScore: "/dashboard/trust-score",
  multilingual: "/dashboard/multilingual",
  export: "/dashboard/export",
  guide: "/dashboard/guide",
} as const;

export type DashboardRoute = (typeof dashboardRoutes)[keyof typeof dashboardRoutes];

export const sidebarLinks = [
  { href: dashboardRoutes.overview, label: "Dashboard", icon: "grid" },
  { href: dashboardRoutes.createNew, label: "Create New", icon: "plus" },
  { href: dashboardRoutes.myProjects, label: "My Projects", icon: "folder" },
  { href: dashboardRoutes.trustScore, label: "AI Trust Score", icon: "sparkle" },
  { href: dashboardRoutes.multilingual, label: "Language Kit", icon: "globe" },
  { href: dashboardRoutes.export, label: "Export & Share", icon: "share" },
  { href: dashboardRoutes.guide, label: "Guidance", icon: "book" },
] as const;

export const nextStepLinks = [
  { label: "Generate Language Kit", href: dashboardRoutes.multilingual },
  { label: "Create 3D Brand Booth", href: dashboardRoutes.brandReality },
  { label: "Get AI Suggestions", href: dashboardRoutes.trustScore },
  { label: "Export Brand Kit", href: dashboardRoutes.export },
  { label: "Share with Team", href: dashboardRoutes.export },
] as const;
