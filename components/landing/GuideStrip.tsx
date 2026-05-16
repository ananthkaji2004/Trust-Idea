import { LandingButton } from "./ui/LandingButton";
import { ScrollReveal } from "./ui/ScrollReveal";

export function GuideStrip() {
  return (
    <section id="guide" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="scale-up" duration={850}>
          <div className="glass-card p-10 md:p-14 border-violet-500/20 shadow-[0_0_80px_rgba(168,85,247,0.15)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Build Your{" "}
              <span className="neon-text">Trusted Brand Reality?</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              Join thousands of founders using TRUST IDEA to turn ideas into launch-ready
              brand kits — powered by Fal visuals, 3D previews, and AI Trust Scores.
            </p>
            <ScrollReveal variant="fade-up" delay={200} className="mt-8 flex flex-wrap justify-center gap-3">
              <LandingButton variant="primary">Get Started Free</LandingButton>
              <LandingButton variant="outline">Read the Guide</LandingButton>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-in" delay={100}>
        <footer className="mt-16 border-t border-white/5 py-8 text-center text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} TRUST IDEA. Frontend demo — no backend connected.
          </p>
        </footer>
      </ScrollReveal>
    </section>
  );
}
