"use client";

import { GatedButton } from "@/components/auth/FeatureGate";

const assets = [
  {
    title: "Logo / Brand Mark",
    gradient: "from-emerald-900/80 via-emerald-950 to-black",
    accent: "bg-emerald-500/30",
    icon: "🍃",
  },
  {
    title: "Hero Image",
    gradient: "from-emerald-800/60 via-green-900/80 to-black",
    accent: "bg-gradient-to-b from-emerald-400/20 to-transparent",
    showCan: true,
  },
  {
    title: "Product Mockup",
    gradient: "from-zinc-800 via-zinc-900 to-black",
    accent: "bg-white/5",
    showBoxes: true,
  },
  {
    title: "Social Media Ad",
    gradient: "from-emerald-950 via-black to-violet-950",
    accent: "bg-emerald-500/10",
    showAd: true,
  },
];

export function FalVisualLabGallery() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Fal Visual Lab</h2>
          <p className="text-xs text-zinc-500">AI Generated</p>
        </div>
        <button
          type="button"
          className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
          aria-label="Next"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <article key={asset.title} className="glass-card overflow-hidden p-0 flex flex-col">
            <div className={`relative h-40 bg-gradient-to-br ${asset.gradient}`}>
              {asset.icon && (
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {asset.icon}
                </div>
              )}
              {asset.showCan && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-20 rounded-lg bg-gradient-to-b from-emerald-400 to-emerald-700 border border-emerald-300/30 shadow-lg" />
              )}
              {asset.showBoxes && (
                <div className="absolute inset-0 flex items-end justify-center gap-2 p-4 pb-6">
                  <div className="h-14 w-8 rounded bg-emerald-600/40 border border-emerald-400/20" />
                  <div className="h-16 w-10 rounded bg-emerald-500/50 border border-emerald-300/30" />
                  <div className="h-12 w-14 rounded bg-zinc-700/50 border border-white/10" />
                </div>
              )}
              {asset.showAd && (
                <div className="absolute inset-3 rounded-lg border border-white/10 bg-black/40 p-2 flex flex-col justify-between">
                  <p className="text-[8px] text-emerald-400 font-bold">ORGANIC ENERGY</p>
                  <p className="text-[10px] text-white font-semibold leading-tight">Fuel Your Day Naturally</p>
                  <span className="self-start rounded bg-emerald-500 px-2 py-0.5 text-[8px] font-bold text-black">
                    Try Now
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <p className="text-sm font-medium text-white mb-3">{asset.title}</p>
              <div className="mt-auto flex gap-2">
                <GatedButton
                  actionId="generate-visual"
                  className="flex-1 rounded-lg border border-white/10 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
                >
                  Edit
                </GatedButton>
                <GatedButton
                  actionId="export-kit"
                  className="flex-1 rounded-lg bg-violet-600/20 border border-violet-500/30 py-1.5 text-xs text-violet-200 hover:bg-violet-600/30"
                >
                  Download
                </GatedButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
