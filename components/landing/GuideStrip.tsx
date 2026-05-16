"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { LandingButton } from "./ui/LandingButton";
import { ScrollReveal } from "./ui/ScrollReveal";

export function GuideStrip() {
  const { openLoginModal } = useAuth();

  return (
    <section id="guide" className="trust-section scroll-mt-24">
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal variant="scale-up" duration={850}>
          <div className="trust-card border-violet-500/30 p-8 text-center shadow-[0_0_80px_rgba(168,85,247,0.15)] sm:p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              Ready to Build Your{" "}
              <span className="neon-text">Trusted Brand Reality?</span>
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              Join thousands of founders using TRUST IDEA to turn ideas into launch-ready brand kits — powered by Fal
              visuals, 3D previews, and AI Trust Scores.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <LandingButton variant="primary" onClick={() => openLoginModal("/create")}>
                Get Started Free
              </LandingButton>
              <LandingButton variant="outline" href="#how-it-works">
                Read the Guide
              </LandingButton>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-in" delay={100}>
        <footer className="mt-16 border-t border-zinc-200/80 dark:border-white/5 py-8 text-center text-sm text-zinc-500 space-y-4">
          <p>© {new Date().getFullYear()} TRUST IDEA · Best Use of Fal showcase build.</p>
          <p className="text-xs">
            <span className="rounded-full border border-zinc-300/80 dark:border-white/10 px-4 py-1 inline-block">
              Built with Cursor
            </span>
          </p>
        </footer>
      </ScrollReveal>
    </section>
  );
}
