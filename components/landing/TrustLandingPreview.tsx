"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/landing/ui/ScrollReveal";
import { SectionHeader } from "@/components/landing/ui/SectionHeader";

export function TrustLandingPreview() {
  const rings = ["Brand clarity", "Audience clarity", "Visual polish", "CTA strength"];

  return (
    <section id="ai-trust-score" className="trust-section scroll-mt-24">
      <div className="trust-container">
        <ScrollReveal variant="fade-up">
          <SectionHeader
            badge="Transparency"
            title="AI Trust Score — Credibility Radar"
            subtitle="Objective heuristic scoring across storytelling, localization, visuals, CTAs, and founder transparency."
          />
        </ScrollReveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          <ScrollReveal variant="scale-up">
            <div className="trust-card flex h-full flex-col items-center justify-center gap-6 border-emerald-500/20 shadow-[0_0_70px_rgba(16,185,129,0.15)]">
              <div className="relative">
                <div className="h-44 w-44 rounded-full border border-emerald-400/40 shadow-[inset_0_0_50px_rgba(16,185,129,0.25)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-zinc-950 dark:text-white">78</span>
                  <span className="text-[11px] text-emerald-200">/100</span>
                  <span className="mt-3 text-[10px] uppercase tracking-[0.3em] text-emerald-300">Trust pulse</span>
                </div>
              </div>
              <Link
                href="/ai-trust-score"
                className="trust-button-secondary rounded-full text-xs"
              >
                Dive into breakdown
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <div className="trust-card h-full">
              <h3 className="mb-5 text-sm font-semibold text-zinc-950 dark:text-white">Momentum metrics</h3>
              <ul className="space-y-4">
                {rings.map((label, i) => (
                  <li key={label}>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>{label}</span>
                      <span>{78 + i * 2}/100</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-violet-500 to-blue-400"
                        style={{ width: `${72 + i * 3}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={220}>
            <div className="trust-card h-full border-violet-500/25">
              <h3 className="mb-3 text-sm font-semibold text-zinc-950 dark:text-white">Auto suggestions</h3>
              <ul className="space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                <li>✦ Add founder story + mission proof points.</li>
                <li>✦ Embed refund + shipping clarity for Colombo-first launches.</li>
                <li>✦ Amplify multilingual CTAs (EN · සිංහල · Tanglish).</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
