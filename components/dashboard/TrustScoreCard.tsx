const metrics = [
  { label: "Brand Clarity", score: 82 },
  { label: "Visual Consistency", score: 75 },
  { label: "CTA Strength", score: 74 },
  { label: "Transparency", score: 80 },
];

export function TrustScoreCard() {
  return (
    <article className="glass-card p-5 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-4">AI Trust Score Breakdown</h3>
      <div className="flex flex-col sm:flex-row gap-6 items-center flex-1">
        <div className="relative shrink-0">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="8"
              strokeDasharray={`${78 * 3.27} 327`}
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
            <span className="text-3xl font-bold text-white">78</span>
            <span className="text-[10px] text-zinc-500">/100</span>
            <span className="text-xs font-medium text-emerald-400 mt-1">Great Score!</span>
          </div>
        </div>
        <div className="flex-1 w-full space-y-3">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">{m.label}</span>
                <span className="text-zinc-300 font-medium">{m.score}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
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
