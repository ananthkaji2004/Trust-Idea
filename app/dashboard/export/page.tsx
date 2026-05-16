import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const exportOptions = [
  { title: "Download Brand Kit (ZIP)", description: "Logos, colors, fonts, and copy" },
  { title: "Export Visuals (PNG)", description: "All Fal Visual Lab assets" },
  { title: "Share Link", description: "Read-only link for your team" },
];

export default function ExportPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Export & Share"
        description="Download your brand kit or share it with collaborators."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        {exportOptions.map((option) => (
          <article key={option.title} className="glass-card p-5 flex flex-col">
            <h2 className="text-sm font-semibold text-white">{option.title}</h2>
            <p className="text-xs text-zinc-500 mt-2 flex-1">{option.description}</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {option.title.startsWith("Share") ? "Copy Link" : "Download"}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
