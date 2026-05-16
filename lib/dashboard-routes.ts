export const dashboardRoutes = {
  overview: "/dashboard",
  createNew: "/create",
  myProjects: "/projects",
  falVisualLab: "/dashboard/fal-visual-lab",
  brandKit: "/brand-kit",
  brandReality: "/3d-brand-reality",
  trustScore: "/ai-trust-score",
  multilingual: "/multilingual-kit",
  export: "/dashboard/export",
  guide: "/guide",
  documents: "/documents",
} as const;

export type DashboardRoute = (typeof dashboardRoutes)[keyof typeof dashboardRoutes];

export const sidebarLinks = [
  { href: dashboardRoutes.overview, label: "Dashboard", icon: "grid" },
  { href: dashboardRoutes.createNew, label: "Create New", icon: "plus" },
  { href: dashboardRoutes.myProjects, label: "My Projects", icon: "folder" },
  { href: dashboardRoutes.falVisualLab, label: "Fal Visual Lab", icon: "sparkle-panel" },
  { href: dashboardRoutes.brandReality, label: "3D Brand Reality", icon: "cube" },
  { href: dashboardRoutes.trustScore, label: "AI Trust Score", icon: "sparkle" },
  { href: dashboardRoutes.brandKit, label: "Brand Kit", icon: "bookmark" },
  { href: dashboardRoutes.multilingual, label: "Language Kit", icon: "globe" },
  { href: dashboardRoutes.documents, label: "Documents", icon: "doc" },
  { href: dashboardRoutes.export, label: "Export & Share", icon: "share" },
  { href: dashboardRoutes.guide, label: "Guide", icon: "book" },
] as const;

export const nextStepLinks = [
  { label: "Generate Language Kit", href: dashboardRoutes.multilingual },
  { label: "Create 3D Brand Booth", href: dashboardRoutes.brandReality },
  { label: "Get AI Suggestions", href: dashboardRoutes.trustScore },
  { label: "Export Brand Kit", href: dashboardRoutes.export },
  { label: "Share with Team", href: dashboardRoutes.export },
] as const;
