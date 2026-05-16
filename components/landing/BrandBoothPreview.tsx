export function BrandBoothPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-cyan-500/20 blur-2xl" />
      <div className="glass-panel neon-border relative overflow-hidden rounded-3xl p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-violet-300/80">
          CSS 3D Brand Booth
        </p>

        <div className="perspective-scene mx-auto h-56 w-56">
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              animation: "spin-slow 18s linear infinite",
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-3xl font-bold text-white shadow-lg glow-neon"
              style={{ transform: "translateZ(72px)" }}
            >
              UB
            </div>
            <div
              className="absolute inset-0 rounded-2xl border border-violet-400/30 bg-indigo-950/60"
              style={{ transform: "rotateY(90deg) translateZ(72px)" }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-cyan-400/30 bg-violet-950/50"
              style={{ transform: "rotateY(180deg) translateZ(72px)" }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-900/40 text-[10px] font-semibold tracking-wider text-cyan-200/80"
              style={{ transform: "rotateY(-90deg) translateZ(72px)" }}
            >
              Ceylon
            </div>
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-900/50"
              style={{ transform: "rotateX(90deg) translateZ(72px)" }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-950/60"
              style={{ transform: "rotateX(-90deg) translateZ(72px)" }}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ animation: "orbit 14s linear infinite" }}
        >
          <div className="h-64 w-64 rounded-full border border-dashed border-violet-500/25" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ animation: "orbit 20s linear infinite reverse" }}
        >
          <div className="h-48 w-48 rounded-full border border-dashed border-cyan-500/20" />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Urban Brew Ceylon · demo preview
        </p>
      </div>
    </div>
  );
}
