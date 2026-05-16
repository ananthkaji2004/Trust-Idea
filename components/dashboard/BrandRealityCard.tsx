import Link from "next/link";
import { dashboardRoutes } from "@/lib/dashboard-routes";

export function BrandRealityCard() {
  return (
    <article className="glass-card overflow-hidden p-0 h-full flex flex-col">
      <div className="p-4 pb-2">
        <h3 className="text-sm font-semibold text-white">3D Brand Reality Preview</h3>
      </div>
      <div className="relative flex-1 min-h-[180px] mx-4 mb-4 rounded-xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-indigo-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(168,85,247,0.35),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-violet-600/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center perspective-hero preserve-3d">
          <div
            className="w-3/4 h-24 rounded-lg border border-violet-400/30 bg-violet-900/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            style={{ transform: "rotateX(55deg) translateZ(10px)" }}
          />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded bg-violet-500/20 border border-violet-400/40 blur-sm" />
        </div>
        <div className="absolute top-3 left-3 flex gap-1">
          <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-blue-400/60" />
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link
          href={dashboardRoutes.brandReality}
          className="block w-full text-center rounded-xl border border-violet-500/40 bg-violet-600/15 py-2.5 text-sm font-medium text-violet-200 hover:bg-violet-600/25 transition-colors"
        >
          Play 3D Preview
        </Link>
      </div>
    </article>
  );
}
