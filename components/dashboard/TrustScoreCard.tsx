"use client";

import { useBrandProject } from "@/components/providers/BrandProjectProvider";

export function TrustScoreCard() {
  const { brand } = useBrandProject();
  const trust = brand?.trustScore;
  const overall = trust?.overall ?? 0;
  const metrics = trust?.metrics?.slice(0, 6) ?? [];
  const circumference = 2 * Math.PI * 52;
  const dash = `${(overall / 100) * circumference} ${circumference}`;

  return (
    <article className="glass-card trust-card-hover flex h-full min-h-[360px] flex-col p-5">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">AI Trust Score Breakdown</h3>
      <div className="flex flex-1 flex-col items-center gap-6 sm:flex-row lg:flex-col xl:flex-row">
        <div className="relative shrink-0">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="8" className="dark:stroke-white/10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="8"
              strokeDasharray={dash}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">{overall}</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-500">/100</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">Momentum</span>
          </div>
        </div>
        <div className="w-full flex-1 space-y-3">
          {!metrics.length && (
            <p className="text-xs text-zinc-500">Generate a bundle to populate trust pillars.</p>
          )}
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex justify-between gap-3 text-xs">
                <span className="truncate text-zinc-600 dark:text-zinc-400">{m.label}</span>
                <span className="text-zinc-800 dark:text-zinc-300 font-medium">{m.score}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-200/80 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
