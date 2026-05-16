import { urbanBrewCeylon } from "@/lib/sample-data";
import { Badge } from "@/components/ui/Badge";

export function FalVisualStrip() {
  return (
    <section id="fal-visual-lab" className="trust-section scroll-mt-24">
      <div className="trust-container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="trust-kicker">
              Fal Visual Lab
            </p>
            <h2 className="trust-heading mt-2">
              Generated brand assets
            </h2>
          </div>
          <Badge variant="purple">Demo placeholders</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {urbanBrewCeylon.visuals.map((visual) => (
            <div
              key={visual.id}
              className="glass-panel trust-card-hover flex h-full min-h-[245px] flex-col overflow-hidden p-0"
            >
              <div
                className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${visual.gradient}`}
              >
                <span className="text-2xl text-white/40">✦</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">{visual.label}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">{visual.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
