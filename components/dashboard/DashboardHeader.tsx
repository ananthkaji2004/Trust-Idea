import Link from "next/link";

import { dashboardRoutes } from "@/lib/dashboard-routes";



export function DashboardHeader() {

  return (

    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">

      <div>

        <h1 className="text-2xl md:text-3xl font-bold text-white">

          Your Brand Reality is Ready! <span className="inline-block">✨</span>

        </h1>

        <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">

          Your AI-generated brand kit is complete — review visuals, trust score, and 3D preview

          before you launch to market.

        </p>

      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0">

        <Link

          href={dashboardRoutes.brandReality}

          className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5 transition-colors"

        >

          Preview 3D Booth

        </Link>

        <Link

          href={dashboardRoutes.brandKit}

          className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5 transition-colors"

        >

          Edit Brief

        </Link>

        <Link

          href={dashboardRoutes.export}

          className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:opacity-90 transition-opacity"

        >

          Download All

        </Link>

      </div>

    </div>

  );

}

