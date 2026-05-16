import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features } from "@/lib/landing-data";

export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Platform"
          title="Everything you need to launch with confidence"
          description="From raw idea to trusted brand reality — Trust Idea orchestrates visuals, copy, and trust in one flow."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlassCard
              key={feature.title}
              glow={feature.glow}
              className="group relative overflow-hidden border-t border-violet-500/20"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-xl text-violet-200">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
