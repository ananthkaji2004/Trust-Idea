import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    title: "Fal Visual Lab",
    description:
      "Generate logos, heroes, product shots, and social assets with Fal — all aligned to your brand palette.",
    icon: "🎨",
    glow: "emerald" as const,
  },
  {
    title: "3D Brand Reality",
    description:
      "Preview packaging and product presence in a CSS 3D scene before investing in full renders.",
    icon: "📦",
    glow: "purple" as const,
  },
  {
    title: "Multilingual Launch Kit",
    description:
      "Ship headlines, descriptions, and CTAs in English, Sinhala, and Tamil from day one.",
    icon: "🌐",
    glow: "emerald" as const,
  },
  {
    title: "AI Trust Score",
    description:
      "Measure authenticity, consistency, accessibility, legal readiness, and AI transparency.",
    icon: "🛡️",
    glow: "purple" as const,
  },
];

export function FeatureGrid() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Platform"
          title="Everything you need to launch with confidence"
          description="From raw idea to trusted brand reality — Veridia orchestrates visuals, copy, and trust in one flow."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <GlassCard key={feature.title} glow={feature.glow} className="group">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
