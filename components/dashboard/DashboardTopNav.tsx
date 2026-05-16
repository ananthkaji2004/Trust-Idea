"use client";

import Link from "next/link";
import { dashboardRoutes } from "@/lib/dashboard-routes";

export function DashboardTopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <Link href={dashboardRoutes.overview} className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-black text-white">
            TI
          </div>
          <span className="text-base font-bold text-white">
            TRUST <span className="neon-text">IDEA</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Home
        </Link>
      </div>
    </header>
  );
}
