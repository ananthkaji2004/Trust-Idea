import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const languages = [
  { code: "en", label: "English", status: "Complete" },
  { code: "es", label: "Spanish", status: "Complete" },
  { code: "fr", label: "French", status: "In progress" },
  { code: "de", label: "German", status: "Not started" },
];

export default function MultilingualPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Language Kit"
        description="Localized copy and assets for global launch."
      />
      <ul className="space-y-3 max-w-xl">
        {languages.map((lang) => (
          <li key={lang.code}>
            <article className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{lang.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{lang.status}</p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 text-xs text-violet-200 hover:bg-violet-600/30"
              >
                View
              </button>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
