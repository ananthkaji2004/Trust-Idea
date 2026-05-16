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
      <div className="grid max-w-4xl grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        {exportOptions.map((option) => (
          <article key={option.title} className="glass-card trust-card-hover flex min-h-[190px] flex-col p-5">
            <h2 className="text-sm font-semibold text-zinc-950 dark:text-white">{option.title}</h2>
            <p className="trust-copy mt-2 flex-1 text-xs">{option.description}</p>
            <button
              type="button"
              className="trust-button-primary mt-5 w-full"
            >
              {option.title.startsWith("Share") ? "Copy Link" : "Download"}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
