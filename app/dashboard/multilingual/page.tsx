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
      <ul className="grid max-w-4xl gap-4 sm:grid-cols-2">
        {languages.map((lang) => (
          <li key={lang.code}>
            <article className="glass-card trust-card-hover flex h-full min-h-[150px] flex-col p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">{lang.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{lang.status}</p>
                </div>
                <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-200">
                  {lang.code}
                </span>
              </div>
              <button
                type="button"
                className="trust-button-secondary mt-auto w-full text-xs"
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
