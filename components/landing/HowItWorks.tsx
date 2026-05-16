import { GlassCard } from "./ui/GlassCard";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const steps = [
  {
    step: "01",
    title: "Share Your Idea",
    description:
      "Describe your business concept in plain language — industry, audience, and vibe. No brief templates needed.",
    gradient: "bg-gradient-to-br from-violet-600/50 to-purple-800/30",
  },
  {
    step: "02",
    title: "Generate Brand Kit",
    description:
      "TRUST IDEA creates logos, color palettes, copy, Fal visuals, and 3D brand previews tailored to your idea.",
    gradient: "bg-gradient-to-br from-indigo-600/50 to-blue-800/30",
  },
  {
    step: "03",
    title: "Review Trust Score",
    description:
      "See your AI Trust Score with actionable insights — improve weak spots before you go to market.",
    gradient: "bg-gradient-to-br from-blue-600/50 to-cyan-800/30",
  },
  {
    step: "04",
    title: "Launch With Confidence",
    description:
      "Export your multilingual kit, social assets, and 3D previews — ready for investors, ads, and launch day.",
    gradient: "bg-gradient-to-br from-fuchsia-600/50 to-violet-800/30",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <SectionHeader
            badge="How It Works"
            title="From Idea to Trusted Brand in Four Steps"
            subtitle="A streamlined flow designed for founders who move fast and need launch-ready assets today."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <ScrollReveal key={item.step} variant="scale-up" delay={i * 120} duration={700}>
              <GlassCard className="relative overflow-hidden h-full">
                <span className="text-5xl font-black text-white/5 absolute -top-2 -right-2">
                  {item.step}
                </span>
                <div className={`h-24 rounded-xl ${item.gradient} mb-4 border border-white/10`} />
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  Step {item.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
