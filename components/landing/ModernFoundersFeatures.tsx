import { GlassCard } from "./ui/GlassCard";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const founderFeatures = [
  {
    title: "One-Click Brand Kits",
    description:
      "Full identity packages from a single idea prompt — logo, colors, typography, and voice.",
  },
  {
    title: "Fal-Powered Visuals",
    description:
      "Hero shots, ads, and lifestyle imagery generated and on-brand without a photoshoot.",
  },
  {
    title: "Investor-Ready Exports",
    description:
      "PDF decks, social sizes, and 3D preview frames formatted for pitches and launches.",
  },
  {
    title: "Trust Score Analytics",
    description:
      "Benchmark messaging and visuals against market standards with actionable AI feedback.",
  },
  {
    title: "Multilingual Launch",
    description:
      "Translate and localize your entire kit for global markets in minutes, not weeks.",
  },
  {
    title: "Founder-First UX",
    description:
      "Built for speed — no design degree, no agency retainer, no endless revision cycles.",
  },
];

export function ModernFoundersFeatures() {
  return (
    <section id="platform" className="relative py-20 md:py-28 z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="blur-in" duration={800}>
          <SectionHeader
            badge="For Founders"
            title="Powerful Features for Modern Founders"
            subtitle="Everything you need to go from napkin sketch to trusted, launch-ready brand — without the overhead."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {founderFeatures.map((feature, index) => (
            <ScrollReveal
              key={feature.title}
              variant="fade-up"
              delay={(index % 3) * 100 + Math.floor(index / 3) * 80}
              duration={650}
            >
              <GlassCard className="h-full">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
