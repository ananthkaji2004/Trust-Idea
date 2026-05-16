import { GlassCard } from "./ui/GlassCard";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const features = [
  {
    key: "fal-visual-lab",
    title: "Fal Visual Lab",
    description:
      "Generate hero images, lifestyle scenes, social ads, and product mockups powered by Fal — styled to your brand in seconds.",
    icon: "🎨",
    gradient: "from-violet-600/30 to-fuchsia-500/20",
  },
  {
    key: "3d-brand-reality",
    title: "3D Brand Reality",
    description:
      "Preview your brand in immersive 3D booths and product stages before you launch — no design team required.",
    icon: "🧊",
    gradient: "from-blue-600/30 to-cyan-500/20",
  },
  {
    key: "ai-trust-score",
    title: "AI Trust Score",
    description:
      "Get an objective trust rating for your brand kit — messaging clarity, visual consistency, and market readiness in one score.",
    icon: "✨",
    gradient: "from-emerald-600/20 to-violet-500/20",
  },
  {
    key: "multilingual-kit",
    title: "Multilingual Kit",
    description:
      "Export launch-ready copy and visuals in multiple languages — expand globally from day one without extra agencies.",
    icon: "🌍",
    gradient: "from-indigo-600/30 to-purple-500/20",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <SectionHeader
            badge="Core Features"
            title="Everything You Need to Launch a Trusted Brand"
            subtitle="From Fal-powered visuals to 3D previews and AI trust scoring — one platform for modern founders."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal
              key={feature.key}
              variant="fade-up"
              delay={index * 100}
              duration={650}
            >
              <GlassCard className="flex flex-col h-full">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-2xl border border-white/10`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
