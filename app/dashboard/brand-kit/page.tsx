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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {kitItems.map((item) => (
          <article key={item.name} className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{item.status}</p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
            >
              Open
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
