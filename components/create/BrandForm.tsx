"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Badge } from "@/components/ui/Badge";
import { defaultFormValues } from "@/lib/sample-data";
import type { BrandFormValues, BrandStyle, LanguageOption, ProductType } from "@/lib/types";

const productTypes: ProductType[] = ["F&B", "SaaS", "Retail", "Services"];
const brandStyles: BrandStyle[] = ["Modern", "Premium", "Playful", "Minimal"];
const languages: LanguageOption[] = [
  "English",
  "Sinhala",
  "Tamil",
  "Multilingual",
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-2 block text-sm font-medium text-zinc-300";

export function BrandForm() {
  const router = useRouter();
  const [form, setForm] = useState<BrandFormValues>(defaultFormValues);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof BrandFormValues>(
    key: K,
    value: BrandFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/result");
    }, 800);
  };

  return (
    <GlassCard className="max-w-2xl">
      <Badge variant="emerald">Demo mode</Badge>
      <p className="mt-2 text-sm text-zinc-400">
        Sample output: Urban Brew Ceylon — form edits are visual only for now.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="businessIdea" className={labelClass}>
            Business idea
          </label>
          <textarea
            id="businessIdea"
            rows={4}
            className={inputClass}
            value={form.businessIdea}
            onChange={(e) => update("businessIdea", e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="productType" className={labelClass}>
              Product type
            </label>
            <select
              id="productType"
              className={inputClass}
              value={form.productType}
              onChange={(e) =>
                update("productType", e.target.value as ProductType)
              }
            >
              {productTypes.map((t) => (
                <option key={t} value={t} className="bg-zinc-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="audience" className={labelClass}>
              Target audience
            </label>
            <input
              id="audience"
              type="text"
              className={inputClass}
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="brandStyle" className={labelClass}>
              Brand style
            </label>
            <select
              id="brandStyle"
              className={inputClass}
              value={form.brandStyle}
              onChange={(e) =>
                update("brandStyle", e.target.value as BrandStyle)
              }
            >
              {brandStyles.map((s) => (
                <option key={s} value={s} className="bg-zinc-900">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className={labelClass}>
              Language
            </label>
            <select
              id="language"
              className={inputClass}
              value={form.language}
              onChange={(e) =>
                update("language", e.target.value as LanguageOption)
              }
            >
              {languages.map((l) => (
                <option key={l} value={l} className="bg-zinc-900">
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <GlowButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Generating brand reality…" : "Generate brand kit"}
        </GlowButton>
      </form>
    </GlassCard>
  );
}
