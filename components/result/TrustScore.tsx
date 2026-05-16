import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BrandResult } from "@/lib/types";

export function TrustScore({
  brand,
  compact = false,
}: {
  brand: BrandResult;
  compact?: boolean;
}) {
  const { overall, metrics, recommendation } = brand.trustScore;

  return (
    <section className={compact ? "py-4" : undefined}>
      <SectionHeader
        eyebrow="AI Trust Score"
        title="Launch readiness"
        description="Composite score across authenticity, consistency, accessibility, legal, and AI transparency."
      />
      <GlassCard glow="purple">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${overall * 2.64} 264`}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{overall}</p>
              <p className="text-xs text-zinc-500">/ 100</p>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-zinc-300">{metric.label}</span>
                  <span className="font-medium text-emerald-400">{metric.score}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-purple-500 transition-all"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-4">
              {recommendation}
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
