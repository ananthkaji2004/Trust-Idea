"use client";

import { useCallback, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { GatedButton } from "@/components/auth/FeatureGate";
import { hydrateBrandBundle, useBrandProject } from "@/components/providers/BrandProjectProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { generateBrandBlueprint } from "@/lib/demoData";
import type { FalVisualAsset } from "@/lib/types";
import { saveProjectBundle } from "@/src/lib/database";

const SLOT_TITLES = ["Logo / Brand Mark", "Hero Image", "Product Mockup", "Social Media Ad"];

const PLACEHOLDER_ACCENTS: Record<
  number,
  {
    gradient: string;
    icon?: string;
    showCan?: boolean;
    showBoxes?: boolean;
    showAd?: boolean;
  }
> = {
  0: { gradient: "from-emerald-900/80 via-emerald-950 to-black", icon: "🍃" },
  1: { gradient: "from-emerald-800/60 via-green-900/80 to-black", showCan: true },
  2: { gradient: "from-zinc-800 via-zinc-900 to-black", showBoxes: true },
  3: { gradient: "from-emerald-950 via-black to-violet-950", showAd: true },
};

export function FalVisualLabGallery() {
  const { showToast } = useToast();
  const { user, demoSession } = useAuth();
  const {
    visuals,
    form,
    brand,
    projectId,
    createdAt,
    setBundle,
  } = useBrandProject();

  const [busy, setBusy] = useState(false);

  const cards = useMemo(() => {
    return SLOT_TITLES.map((title, index) => {
      const accent = PLACEHOLDER_ACCENTS[index] ?? PLACEHOLDER_ACCENTS[0];
      const matched =
        visuals.find((v) => v.label.includes(title.split(" / ")[0] ?? ""))
        ?? visuals.find((_, i) => i === index)
        ?? visuals[index];

      const img = matched?.imageUrl;
      const gradient = matched?.gradient ?? accent.gradient;

      return {
        title,
        img,
        gradient,
        caption: matched?.caption ?? "Fal slot — regenerate for fresh pixels.",
        prompt: matched?.prompt,
      };
    });
  }, [visuals]);

  const handleRegenerate = useCallback(async () => {
    if (!(user ?? demoSession)) {
      showToast("Sign in to regenerate Fal-ready outputs.", "info");
      return;
    }
    if (!brand || !form) {
      showToast("Generate a bundle first — then regenerate visuals.", "info");
      return;
    }
    try {
      setBusy(true);
      const res = await fetch("/api/generate-visuals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName: brand.name, form }),
      });
      const data = await res.json();
      if (!data?.visuals) {
        showToast("Fal regeneration fell back locally — visuals still sparkle.", "info");
      } else {
        showToast("Visual lab refreshed ✨");
      }
      const nextVisuals =
        Array.isArray(data?.visuals) && data.visuals.length
          ? (data.visuals as FalVisualAsset[])
          : visuals;

      const blueprint = generateBrandBlueprint(form);
      const bundle = hydrateBrandBundle(blueprint, form, nextVisuals);
      const nextProjectId = projectId ?? crypto.randomUUID();
      const nextCreatedAt = createdAt ?? new Date().toISOString();
      setBundle({
        id: nextProjectId,
        createdAt: nextCreatedAt,
        form,
        brand: bundle.brand,
        visuals: nextVisuals,
      });
      if (user?.id) {
        void saveProjectBundle({
          projectId: nextProjectId,
          userId: user.id,
          title: bundle.brand.name,
          form,
          brand: bundle.brand,
          visuals: nextVisuals,
          createdAt: nextCreatedAt,
        });
      }
    } catch {
      showToast("Network hiccup — kept your neon placeholders intact.", "danger");
    } finally {
      setBusy(false);
    }
  }, [
    brand,
    createdAt,
    demoSession,
    form,
    projectId,
    setBundle,
    showToast,
    user,
    visuals,
  ]);

  return (
    <section className="mb-6">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="trust-kicker mb-2">Fal Visual Lab</p>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">AI-ready visual slots</h2>
          <p className="trust-copy mt-1 text-xs">Regenerate server-side Fal calls with polished fallback assets.</p>
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={handleRegenerate}
          className="trust-button-secondary self-start text-xs sm:self-auto"
        >
          {busy ? "Regenerating…" : "Regenerate"}
        </button>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((asset, index) => {
          const accent = PLACEHOLDER_ACCENTS[index] ?? PLACEHOLDER_ACCENTS[0];
          return (
            <article key={asset.title} className="glass-card trust-card-hover flex h-full min-h-[330px] flex-col overflow-hidden p-0">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${asset.gradient}`}>
                {asset.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset.img} alt={asset.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : null}

                {!asset.img && accent.icon && (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">{accent.icon}</div>
                )}
                {!asset.img && accent.showCan && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-20 rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-700 border border-emerald-300/30 shadow-lg" />
                )}
                {!asset.img && accent.showBoxes && (
                  <div className="absolute inset-0 flex items-end justify-center gap-2 p-4 pb-6">
                    <div className="h-14 w-8 rounded bg-emerald-600/40 border border-emerald-400/20" />
                    <div className="h-16 w-10 rounded bg-emerald-500/50 border border-emerald-300/30" />
                    <div className="h-12 w-14 rounded bg-zinc-700/50 border border-white/10" />
                  </div>
                )}
                {!asset.img && accent.showAd && (
                  <div className="absolute inset-3 rounded-lg border border-white/10 bg-black/40 p-2 flex flex-col justify-between">
                    <p className="text-[8px] text-emerald-400 font-bold">ORGANIC ENERGY</p>
                    <p className="text-[10px] text-white font-semibold leading-tight">Fuel Your Day Naturally</p>
                    <span className="self-start rounded bg-emerald-500 px-2 py-0.5 text-[8px] font-bold text-black">
                      Try Now
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">{asset.title}</p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-500 mb-3 line-clamp-3">{asset.caption}</p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <GatedButton
                    actionId="generate-visual"
                    className="trust-button-secondary min-h-9 px-3 py-1.5 text-xs"
                  >
                    Edit
                  </GatedButton>
                  <GatedButton
                    actionId="export-kit"
                    className="trust-button-primary min-h-9 px-3 py-1.5 text-xs"
                  >
                    Download
                  </GatedButton>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
