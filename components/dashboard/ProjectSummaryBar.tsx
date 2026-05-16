export function ProjectSummaryBar() {
  const items = [
    {
      label: "Project Name",
      value: "Organic Energy Drink",
      tag: "Beverage",
    },
    { label: "Created On", value: "May 25, 2025 · 10:30 AM" },
    { label: "Target Audience", value: "Health-conscious adults (18-40)" },
    { label: "Brand Tone", value: "Energetic, Natural, Bold, Modern" },
  ];

  return (
    <div className="glass-card flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 lg:divide-x lg:divide-white/10 p-4 lg:p-0">
      {items.map((item) => (
        <div key={item.label} className="lg:flex-1 lg:px-5 lg:py-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{item.label}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-white">{item.value}</p>
            {"tag" in item && item.tag && (
              <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                {item.tag}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="lg:flex-1 lg:px-5 lg:py-4 flex items-center justify-between lg:justify-start gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">AI Trust Score</p>
          <p className="text-sm font-bold text-emerald-400">78/100</p>
        </div>
        <div className="relative h-12 w-12 shrink-0">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="78 100"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            78
          </span>
        </div>
      </div>
    </div>
  );
}
