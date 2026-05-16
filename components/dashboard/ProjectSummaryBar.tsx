"use client";

import { useMemo } from "react";
import { useBrandProject } from "@/components/providers/BrandProjectProvider";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ProjectSummaryBar() {
  const { brand, form, blueprint, createdAt } = useBrandProject();

  const items = useMemo(
    () => [
      {
        label: "Project Name",
        value: brand?.name ?? "—",
        tag: form?.productServiceType,
      },
      { label: "Created On", value: formatDate(createdAt) },
      { label: "Target Audience", value: form?.targetAudience ?? "—" },
      {
        label: "Brand Tone",
        value: blueprint?.brandTone ?? brand?.voiceTone?.[0] ?? "—",
      },
    ],
    [
      blueprint?.brandTone,
      brand,
      createdAt,
      form?.productServiceType,
      form?.targetAudience,
    ]
  );

  const score = blueprint?.trustScore ?? brand?.trustScore.overall ?? 0;

  return (
    <div className="glass-card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-zinc-200/80 lg:p-0 dark:lg:divide-white/10">
      {items.map((item) => (
        <div key={item.label} className="min-w-0 rounded-2xl bg-zinc-950/[0.02] p-3 lg:rounded-none lg:bg-transparent lg:px-5 lg:py-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{item.label}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">{item.value}</p>
            {"tag" in item && item.tag && (
              <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                {item.tag}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-zinc-950/[0.02] p-3 sm:col-span-2 lg:col-span-1 lg:rounded-none lg:bg-transparent lg:px-5 lg:py-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">AI Trust Score</p>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {score}/100
          </p>
        </div>
        <div className="relative h-12 w-12 shrink-0">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="3" className="dark:stroke-white/10" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray={`${((score / 100) * 94.25).toFixed(2)} 94.25`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-zinc-900 dark:text-white">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
}
