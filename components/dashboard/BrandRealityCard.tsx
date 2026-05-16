import Link from "next/link";
import { MoreOptionsMenuButton } from "@/components/ui/MoreOptionsMenuButton";
import { dashboardRoutes } from "@/lib/dashboard-routes";

export function BrandRealityCard() {
  return (
    <article className="glass-card trust-card-hover flex h-full min-h-[360px] flex-col overflow-hidden p-0">
      <div className="p-5 pb-3">
        <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">3D Brand Reality Preview</h3>
        <p className="mt-1 text-xs text-zinc-500">Neon booth stage synced to your kit.</p>
      </div>
      <div className="relative mx-5 mb-5 min-h-[210px] flex-1 overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-indigo-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(168,85,247,0.35),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-violet-600/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center perspective-hero preserve-3d">
          <div
            className="w-3/4 h-24 rounded-lg border border-violet-400/30 bg-violet-900/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            style={{ transform: "rotateX(55deg) translateZ(10px)" }}
          />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded bg-violet-500/20 border border-violet-400/40 blur-sm" />
        </div>
        <MoreOptionsMenuButton className="absolute top-3 right-3" />
      </div>
      <div className="mt-auto px-5 pb-5">
        <Link
          href={dashboardRoutes.brandReality}
          className="trust-button-primary w-full"
        >
          Play 3D Preview
        </Link>
      </div>
    </article>
  );
}
