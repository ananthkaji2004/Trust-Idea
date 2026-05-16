import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

export default function CreateNewPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Create New"
        description="Start a new brand project from your idea."
      />
      <article className="glass-card p-6 max-w-xl">
        <p className="text-sm text-zinc-400">
          Describe your business idea to generate a launch-ready brand kit with visuals, copy, and trust scoring.
        </p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Start New Project
        </button>
      </article>
    </>
  );
}
