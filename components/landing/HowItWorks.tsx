import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { howItWorksSteps } from "@/lib/landing-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="How it works"
          title="From idea to launch in four steps"
          description="Trust Idea guides you through brand generation, trust scoring, and multilingual launch — all with demo data."
          align="center"
        />

        <div className="hidden gap-4 lg:grid lg:grid-cols-4">
          {howItWorksSteps.map((step, i) => (
            <div key={step.step} className="relative">
              {i < howItWorksSteps.length - 1 && (
                <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-violet-500/50 to-cyan-500/30 lg:block" />
              )}
              <GlassCard glow="purple" className="relative h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="space-y-4 lg:hidden">
          {howItWorksSteps.map((step) => (
            <GlassCard key={step.step} glow="purple">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
