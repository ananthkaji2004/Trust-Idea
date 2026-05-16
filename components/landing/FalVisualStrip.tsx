import { urbanBrewCeylon } from "@/lib/sample-data";
import { Badge } from "@/components/ui/Badge";

export function FalVisualStrip() {
  return (
    <section className="px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
              Fal Visual Lab
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white md:text-2xl">
              Generated brand assets
            </h2>
          </div>
          <Badge variant="purple">Demo placeholders</Badge>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {urbanBrewCeylon.visuals.map((visual) => (
            <div
              key={visual.id}
              className="glass-panel w-44 shrink-0 overflow-hidden rounded-xl border border-white/10 md:w-52"
            >
              <div
                className={`flex h-28 items-center justify-center bg-gradient-to-br ${visual.gradient}`}
              >
                <span className="text-2xl text-white/40">✦</span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-white">{visual.label}</p>
                <p className="mt-0.5 text-[10px] text-zinc-500">{visual.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
