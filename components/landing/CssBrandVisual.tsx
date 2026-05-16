export function CssBrandVisual() {
  return (
    <div className="relative mx-auto flex max-w-lg items-center justify-center py-8">
      <div className="absolute h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse-glow" />
      <div
        className="absolute h-48 w-48 rounded-full bg-purple-500/20 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="glass-card relative w-full max-w-sm rounded-2xl p-8 animate-float">
        <div className="perspective-scene mx-auto h-48 w-48">
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              animation: "spin-slow 16s linear infinite",
            }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-purple-600 text-2xl font-bold text-white shadow-lg"
              style={{ transform: "translateZ(60px)" }}
            >
              UB
            </div>
            <div
              className="absolute inset-0 rounded-xl border border-emerald-400/30 bg-emerald-900/40"
              style={{ transform: "rotateY(90deg) translateZ(60px)" }}
            />
            <div
              className="absolute inset-0 rounded-xl border border-purple-400/30 bg-purple-900/40"
              style={{ transform: "rotateY(180deg) translateZ(60px)" }}
            />
            <div
              className="absolute inset-0 rounded-xl border border-amber-400/30 bg-amber-900/30"
              style={{ transform: "rotateY(-90deg) translateZ(60px)" }}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ animation: "orbit 12s linear infinite" }}
        >
          <div className="h-56 w-56 rounded-full border border-dashed border-emerald-500/30" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ animation: "orbit 18s linear infinite reverse" }}
        >
          <div className="h-44 w-44 rounded-full border border-dashed border-purple-500/30" />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          CSS 3D brand preview — powered by Veridia
        </p>
      </div>
    </div>
  );
}
