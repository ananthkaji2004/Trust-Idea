import Link from "next/link";

import { dashboardRoutes } from "@/lib/dashboard-routes";



export function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-3xl">
        <p className="trust-kicker mb-3">Workspace</p>
        <h1 className="trust-heading">
          Your Brand Reality is Ready! <span className="inline-block">✨</span>
        </h1>
        <p className="trust-copy mt-3 max-w-2xl">
          Your AI-generated brand kit is complete — review visuals, trust score, and 3D preview
          before you launch to market.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-3 lg:shrink-0">
        <Link
          href={dashboardRoutes.brandReality}
          className="trust-button-secondary"
        >
          Preview 3D Booth
        </Link>
        <Link
          href={dashboardRoutes.brandKit}
          className="trust-button-secondary"
        >
          Edit Brief
        </Link>
        <Link
          href={dashboardRoutes.export}
          className="trust-button-primary"
        >
          Download All
        </Link>
      </div>
    </div>
  );
}

