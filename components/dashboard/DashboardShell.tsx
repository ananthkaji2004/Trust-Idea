"use client";

import { DemoBanner } from "@/components/auth/DemoBanner";
import { ProtectedWorkspace } from "@/components/auth/ProtectedWorkspace";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav";
import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 z-10">
      <DashboardTopNav />
      <DashboardSidebar />
      <main className="lg:pl-60 pt-16 min-h-screen">
        <div className="trust-dashboard-container p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <DashboardMobileNav />
          <DemoBanner />
          <ProtectedWorkspace>{children}</ProtectedWorkspace>
        </div>
      </main>
    </div>
  );
}
