"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BrandResult } from "@/lib/types";

export function MultilingualKit({ brand }: { brand: BrandResult }) {
  const [active, setActive] = useState(brand.locales[0].code);
  const locale = brand.locales.find((l) => l.code === active) ?? brand.locales[0];

  return (
    <section>
      <SectionHeader
        eyebrow="Multilingual Launch Kit"
        title="Ready-to-ship copy"
        description="Headlines, descriptions, and CTAs in English, Sinhala, and Tamil."
      />
      <GlassCard>
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {brand.locales.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setActive(l.code)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                active === l.code
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.language}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Headline
            </p>
            <p className="mt-1 text-xl font-semibold text-white">{locale.headline}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Description
            </p>
            <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
              {locale.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              CTA
            </p>
            <p className="mt-1 inline-block rounded-lg bg-gradient-to-r from-emerald-500/20 to-purple-500/20 border border-white/10 px-4 py-2 text-sm font-medium text-emerald-300">
              {locale.cta}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Hashtags
            </p>
            <p className="mt-1 text-sm text-purple-300">
              {locale.hashtags.join(" ")}
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
