"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/landing/ui/ScrollReveal";
import { SectionHeader } from "@/components/landing/ui/SectionHeader";

const cards = [
  "What TRUST IDEA is",
  "Fal prompts + safeguards",
  "3D Booth controls",
  "Trust scoring methodology",
];

export function DocumentsLandingPreview() {
  return (
    <section id="documents" className="trust-section scroll-mt-24">
      <div className="trust-container">
        <ScrollReveal variant="blur-in">
          <SectionHeader
            badge="Knowledge Base"
            title="Premium Docs & Guided Playbooks"
            subtitle="Structured answers for jurors + founders — searchable inside the dashboard documents hub."
          />
        </ScrollReveal>

        <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <ScrollReveal key={card} variant="fade-up" delay={idx * 70}>
              <article className="trust-card trust-card-hover h-full min-h-[220px]">
                <p className="text-xs uppercase tracking-[0.3em] text-violet-300 mb-4">Chapter 0{idx + 1}</p>
                <h3 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-white">{card}</h3>
                <p className="trust-copy">
                  Hover states, gradients, and glass layers echo the SaaS cockpit you’ll demo live.
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/documents"
            className="trust-button-primary"
          >
            Open Documents Space
          </Link>
          <Link
            href="/guide"
            className="trust-button-secondary"
          >
            Step-by-step guide
          </Link>
        </div>
      </div>
    </section>
  );
}
