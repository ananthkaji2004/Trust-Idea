"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  hydrateBrandBundle,
  upsertIndexedProject,
  useBrandProject,
} from "@/components/providers/BrandProjectProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { SkeletonPulse } from "@/components/ui/Skeleton";
import { STORAGE_KEYS } from "@/lib/demoData";
import { fallbackVisualAssets, generateBrandBlueprint } from "@/lib/demoData";
import { defaultFormValues as seedDefaults } from "@/lib/sample-data";
import type {
  BrandFormValues,
  BrandStyle,
  FalVisualAsset,
  LanguageOption,
  OutputDepth,
  ProductServiceType,
  VisualMood,
} from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveProjectBundle, saveUserPreferences } from "@/src/lib/database";

const productTypes: ProductServiceType[] = [
  "Food & Beverage",
  "SaaS / Software",
  "Retail / E-commerce",
  "Services",
  "Health & Wellness",
  "Other",
];

const brandStyles: BrandStyle[] = ["Premium", "Futuristic", "Friendly", "Local", "Luxury", "Minimal"];

const visualMoods: VisualMood[] = ["Cinematic", "Bold", "Clean", "Warm", "Playful"];

const languages: LanguageOption[] = ["English", "Tamil Tanglish", "Sinhala"];

const outputDepths: OutputDepth[] = ["Quick", "Balanced", "Detailed"];

const inputClass =
  "trust-input";

const labelClass = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500";

export function BrandForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { openLoginModal, user, demoSession } = useAuth();
  const { form: hydratedForm, isHydrated, setBundle } = useBrandProject();
  const [form, setForm] = useState<BrandFormValues>(hydratedForm ?? seedDefaults);

  useEffect(() => {
    if (hydratedForm) {
      setForm(hydratedForm);
    }
  }, [hydratedForm]);

  useEffect(() => {
    const ideaParam = searchParams.get("idea");
    if (ideaParam) {
      setForm((prev) => ({ ...prev, businessIdea: decodeURIComponent(ideaParam) }));
    }
  }, [searchParams]);

  const [busy, setBusy] = useState(false);

  const update = <K extends keyof BrandFormValues>(key: K, value: BrandFormValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const applyDemoIdea = (idea: Partial<BrandFormValues>) => {
    setForm((prev) => ({ ...prev, ...idea }));
    showToast("Demo idea pasted into your brief.");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!(user ?? demoSession)) {
      openLoginModal("/create");
      return;
    }

    try {
      setBusy(true);

      const baseBlueprintLocal = generateBrandBlueprint(form);

      window.localStorage.setItem("trust-idea-create-draft", JSON.stringify(form));

      const seedVisuals: FalVisualAsset[] = fallbackVisualAssets(form, baseBlueprintLocal.brandName);

      let blueprint = baseBlueprintLocal;
      let visuals: FalVisualAsset[] = seedVisuals;

      try {
        const brandResp = await fetch("/api/generate-brand", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const brandJson = await brandResp.json();
        blueprint = brandJson.blueprint ?? blueprint;

        const visualResp = await fetch("/api/generate-visuals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brandName: blueprint.brandName,
            form,
          }),
        });
        const visualJson = await visualResp.json();
        if (
          typeof visualJson === "object"
          && visualJson
          && Array.isArray((visualJson as { visuals?: unknown }).visuals)
        ) {
          const remoteVisuals = (visualJson as { visuals: FalVisualAsset[] }).visuals;
          if (remoteVisuals?.length) {
            visuals = remoteVisuals;
          }
        }
      } catch {
        visuals = fallbackVisualAssets(form, blueprint.brandName);
      }

      /** Ensure coherence if remote mismatch */
      visuals = visuals.length >= 4 ? visuals : fallbackVisualAssets(form, blueprint.brandName);

      const bundle = hydrateBrandBundle(blueprint, form, visuals);
      const createdAt = new Date().toISOString();
      const projectId =
        typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `project-${createdAt}`;

      setBundle({
        id: projectId,
        createdAt,
        form,
        brand: bundle.brand,
        visuals,
      });

      upsertIndexedProject({
        id: projectId,
        createdAt,
        form,
        brand: bundle.brand,
        visuals,
      });

      const savedRemote = await saveProjectBundle({
        projectId,
        userId: user?.id ?? "",
        title: blueprint.brandName,
        form,
        brand: bundle.brand,
        visuals,
        createdAt,
      });

      window.localStorage.setItem(STORAGE_KEYS.kitLang, form.language);
      if (user?.id) {
        void saveUserPreferences(user.id, {
          language: form.language,
          theme: window.localStorage.getItem("theme") ?? "dark",
        });
      }

      if (savedRemote.source !== "supabase" && user?.id && isSupabaseConfigured()) {
        showToast("Saved offline — configure Supabase tables when ready.", "info");
      }

      showToast("Brand Reality ready!");
      router.push("/dashboard");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Something wobbled — try Demo Login for stability.",
        "danger"
      );
    } finally {
      setBusy(false);
    }
  };

  const demoStacks: Partial<BrandFormValues>[] = useMemo(
    () => [
      {
        businessIdea:
          "Skyline Micro‑Roastery — Colombo cloud-kitchen roasting lab shipping subscription pouches nationwide.",
        brandStyle: "Premium",
        visualMood: "Cinematic",
        language: "English",
      },
      {
        businessIdea:
          "KadePay — Tanglish-first POS + UPI payouts for saree boutiques & spice stalls across Jaffna + Wellawatte.",
        brandStyle: "Friendly",
        visualMood: "Playful",
        language: "Tamil Tanglish",
      },
      {
        businessIdea:
          "Hela Harvest Box — biodegradable meal kits honoring Hela cultivation with multilingual nutrition coaching.",
        brandStyle: "Local",
        visualMood: "Warm",
        language: "Sinhala",
      },
    ],
    []
  );

  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <SkeletonPulse className="h-44 w-full" />
        <SkeletonPulse className="h-[420px] w-full" />
      </div>
    );
  }

  return (
    <GlassCard className="mx-auto mt-8 w-full max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <Badge variant="emerald">Fal Visual Lab queued</Badge>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
            Feed us the soul of your hustle — Fal renders four hero-grade panels while heuristic engines keep the flow
            alive even if APIs blink.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {demoStacks.map((stack, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => applyDemoIdea(stack)}
            className="trust-button-secondary min-h-9 rounded-full px-3 py-1.5 text-xs"
          >
            Demo idea #{idx + 1}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        <Field label="Business idea">
          <textarea
            rows={4}
            className={`${inputClass} min-h-[120px]`}
            value={form.businessIdea}
            onChange={(e) => update("businessIdea", e.target.value)}
            required
          />
        </Field>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Product / Service">
            <select
              value={form.productServiceType}
              onChange={(e) => update("productServiceType", e.target.value as ProductServiceType)}
              className={inputClass}
            >
              {productTypes.map((t) => (
                <option key={t} value={t} className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Target audience">
            <input
              value={form.targetAudience}
              onChange={(e) => update("targetAudience", e.target.value)}
              className={inputClass}
              placeholder="Urban pros, kiosk owners…"
              required
            />
          </Field>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Location / Market">
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
              placeholder="City · rollout map"
              required
            />
          </Field>
          <Field label="Customer problem">
            <textarea
              rows={3}
              className={`${inputClass} min-h-[96px]`}
              value={form.customerProblem}
              onChange={(e) => update("customerProblem", e.target.value)}
              placeholder="What tension are you dissolving?"
              required
            />
          </Field>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Brand style">
            <select
              value={form.brandStyle}
              onChange={(e) => update("brandStyle", e.target.value as BrandStyle)}
              className={inputClass}
            >
              {brandStyles.map((s) => (
                <option key={s} value={s} className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Visual mood">
            <select
              value={form.visualMood}
              onChange={(e) => update("visualMood", e.target.value as VisualMood)}
              className={inputClass}
            >
              {visualMoods.map((mood) => (
                <option key={mood} value={mood} className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  {mood}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Language">
            <select
              value={form.language}
              onChange={(e) => update("language", e.target.value as LanguageOption)}
              className={inputClass}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  {lang}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Output depth">
            <select
              value={form.outputDepth}
              onChange={(e) => update("outputDepth", e.target.value as OutputDepth)}
              className={inputClass}
            >
              {outputDepths.map((depth) => (
                <option key={depth} value={depth} className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  {depth}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex justify-end border-t border-zinc-200/80 pt-6 dark:border-white/10">
          <GlowButton type="submit" variant="primary" className="w-full md:w-auto md:min-w-64" disabled={busy}>
          {busy ? "Synthesizing…" : "Generate Brand Reality"}
          </GlowButton>
        </div>
      </form>
    </GlassCard>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      {children}
    </div>
  );
}
