"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { dashboardRoutes } from "@/lib/dashboard-routes";

export function DashboardTopNav() {
  const { user, isLoading, signOut, openLoginModal } = useAuth();

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Account";

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

        <div className="flex items-center gap-3">
          {!isLoading && !user && (
            <span className="hidden sm:inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200">
              Demo
            </span>
          )}

          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Home
          </Link>

          {!isLoading &&
            (user ? (
              <>
                <span className="hidden sm:inline text-xs text-zinc-400 truncate max-w-[140px]">
                  {displayName}
                </span>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => openLoginModal("/dashboard")}
                className="rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Sign in
              </button>
            ))}
        </div>
      </div>
    </header>
  );
}
