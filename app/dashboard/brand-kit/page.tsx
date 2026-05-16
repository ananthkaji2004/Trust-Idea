import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";

const kitItems = [
  { name: "Logo / Brand Mark", status: "Ready" },
  { name: "Color Palette", status: "Ready" },
  { name: "Typography", status: "Ready" },
  { name: "Voice & Tone", status: "Draft" },
];

export default function BrandKitPage() {
  return (
    <>
      <DashboardSectionHeader
        title="Brand Kit"
        description="Your complete brand identity assets in one place."
      />
      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kitItems.map((item) => (
          <article key={item.name} className="glass-card trust-card-hover flex min-h-[180px] flex-col p-5">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/25 bg-violet-500/10 text-violet-400">
              ✦
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-950 dark:text-white">{item.name}</p>
              <p className="mt-1 text-xs text-zinc-500">{item.status}</p>
            </div>
            <button
              type="button"
              className="trust-button-secondary mt-5 w-full text-xs"
            >
              Open
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
