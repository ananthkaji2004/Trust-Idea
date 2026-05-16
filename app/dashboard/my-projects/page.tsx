import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const projects = [
  { name: "Organic Energy", updated: "2 days ago", status: "Active" },
  { name: "Nova SaaS", updated: "1 week ago", status: "Draft" },
];

export default function MyProjectsPage() {
  return (
    <>
      <DashboardSectionHeader
        title="My Projects"
        description="All your brand projects in one place."
      />
      <ul className="space-y-3 max-w-2xl">
        {projects.map((project) => (
          <li key={project.name}>
            <article className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{project.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">Updated {project.updated}</p>
              </div>
              <span className="rounded-full border border-violet-500/30 bg-violet-600/15 px-2.5 py-0.5 text-xs text-violet-200">
                {project.status}
              </span>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
