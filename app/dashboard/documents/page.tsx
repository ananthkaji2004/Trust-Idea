"use client";

import { useMemo, useState } from "react";
import { DashboardSectionHeader } from "@/components/dashboard/DashboardSectionHeader";
import { GlowButton } from "@/components/ui/GlowButton";

const sections = [
  {
    id: "what",
    title: "What is TRUST IDEA?",
    body: "A hackathon-grade launch lab that turns one raw business idea into Fal imagery, heuristic brand DNA, multilingual snippets, a 3D neon booth preview, and an AI Trust Score — with Supabase persistence when you plug in keys.",
  },
  {
    id: "use-app",
    title: "How to use the app",
    steps: [
      "Register / login (or Demo Login for sandbox speed).",
      "Drop your idea on `/` or `/create` — every field maps to Fal + heuristics.",
      "Land on the dashboard to audit visuals, booth, trust breakdown, and exports.",
    ],
  },
  {
    id: "fal-lab",
    title: "How Fal Visual Lab works",
    body: "Four slots (logo mark, hero, mockup, social ad) call `/api/generate-visuals` server-side with `FAL_KEY`. If Fal is offline, polished gradient placeholders ship with status “fallback”.",
  },
  {
    id: "3d",
    title: "How 3D Brand Reality works",
    body: "CSS perspective + neon glass layers simulate a expo booth — no WebGL dependency. Hover states and lighting accents sync with dashboard theme tokens.",
  },
  {
    id: "trust",
    title: "How AI Trust Score works",
    body: "Heuristic weighted dimensions (brand clarity, CTA honesty, localization, etc.) echo your selected output depth plus trust playbook suggestions sourced from curated guidance.",
  },
  {
    id: "export",
    title: "How to export / share",
    body: "Export & Share demos polished download + copy UX. When heavyweight ZIP backends land, hooks are server-only — meanwhile success toasts affirm the Founder flow.",
  },
  {
    id: "faq",
    title: "FAQ",
    items: [
      { q: "Do you leak `FAL_KEY`?", a: "Never — Fal only runs inside API routes." },
      { q: "What if Supabase is empty?", a: "Projects gracefully fall back to localStorage snapshots." },
      { q: "Can I demo without Google SSO?", a: "Yes — email/password or Demo Login routes you through `/create`." },
    ],
  },
];

export default function DocumentsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return sections;
    const needle = q.toLowerCase();
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(needle)
        || ("body" in s && typeof s.body === "string" && s.body.toLowerCase().includes(needle))
        || ("items" in s && s.items?.some((i) => i.q.toLowerCase().includes(needle)))
    );
  }, [q]);

  return (
    <>
      <DashboardSectionHeader
        title="Documents"
        description="Premium field guide covering TRUST IDEA, Fal, booths, scoring, exports, and FAQs."
      />

      <div className="glass-card mb-8 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <label className="w-full shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-500 sm:w-auto">
          Search docs
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search topics, FAQs, Fal..."
          className="trust-input flex-1"
        />
        <GlowButton
          variant="secondary"
          type="button"
          className="px-5 py-2 sm:shrink-0"
          onClick={() => void navigator.clipboard?.writeText("TRUST IDEA — docs snapshot")}
        >
          Download Guide UI
        </GlowButton>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {filtered.map((section) => (
          <article key={section.id} className="glass-card trust-card-hover flex h-full min-h-[250px] flex-col p-6">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">{section.title}</h2>

            {"body" in section && section.body ? (
              <p className="trust-copy mt-3 flex-1">{section.body}</p>
            ) : null}

            {"steps" in section && Array.isArray(section.steps) ? (
              <ol className="mt-4 flex-1 list-inside list-decimal space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {section.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : null}

            {"items" in section && section.items ? (
              <dl className="mt-4 flex-1 space-y-4">
                {section.items.map((item) => (
                  <div key={item.q}>
                    <dt className="text-sm font-medium text-zinc-950 dark:text-white">{item.q}</dt>
                    <dd className="trust-copy mt-1">{item.a}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
