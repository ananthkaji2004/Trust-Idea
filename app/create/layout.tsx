import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProtectedWorkspace } from "@/components/auth/ProtectedWorkspace";
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav";

export const metadata: Metadata = {
  title: "Create — TRUST IDEA",
};

export default function CreateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100">
      <DashboardTopNav />
      <main className="pt-16">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 overflow-x-hidden">
          <ProtectedWorkspace>{children}</ProtectedWorkspace>
        </div>
      </main>
    </div>
  );
}
