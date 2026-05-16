import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import type { BrandResult } from "@/lib/types";

export function FalVisualLab({ brand }: { brand: BrandResult }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Fal Visual Lab"
        title="Brand visuals"
        description="Placeholder slots for Fal-generated assets. Connect Fal API in production."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brand.visuals.map((visual) => (
          <GlassCard key={visual.id} className="p-0 overflow-hidden" glow="purple">
            <div
              className={`flex h-40 items-center justify-center bg-gradient-to-br ${visual.gradient}`}
            >
              <span className="text-4xl opacity-60">✦</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-white">{visual.label}</h4>
                <Badge variant="purple">Fal</Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{visual.caption}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
