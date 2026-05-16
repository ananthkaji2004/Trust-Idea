"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { dashboardRoutes } from "@/lib/dashboard-routes";

export function DashboardTopNav() {
  const { user, demoSession, isLoading, signOut, openLoginModal } = useAuth();

  const demoMode = !!demoSession && !user;

  const displayName =
    user?.user_metadata?.full_name
    ?? user?.user_metadata?.name
    ?? user?.email?.split("@")[0]
    ?? demoSession?.name
    ?? demoSession?.email?.split("@")[0]
    ?? "Founder";

  const emailShown = user?.email ?? demoSession?.email ?? null;

  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((p: string) => p[0]?.toUpperCase())
    .join("")
    || "TI";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/95">
      <div className="trust-container flex h-full items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0" title="Back to landing">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-black text-white">
            TI
          </div>
          <span className="hidden text-base font-bold text-zinc-900 dark:text-white sm:inline">
            TRUST <span className="neon-text">IDEA</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={dashboardRoutes.createNew}
            className="hidden min-h-9 shrink-0 items-center rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-500/15 dark:text-violet-200 md:inline-flex"
          >
            New brief
          </Link>

          <ThemeToggle compact />

          {!isLoading && demoMode && (
            <span className="hidden rounded-full border border-violet-500/35 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-200 sm:inline-flex">
              Demo
            </span>
          )}

          <Link
            href="/"
            className="hidden shrink-0 text-xs text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300 sm:inline"
          >
            Home
          </Link>

          {!isLoading
            && (user || demoSession ? (
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-500/40 bg-gradient-to-br from-violet-600/40 to-blue-600/40 text-xs font-bold text-white"
                  aria-hidden
                >
                  {initials}
                </div>
                <div className="hidden lg:flex flex-col min-w-0">
                  <span className="text-xs font-medium text-zinc-800 dark:text-white truncate max-w-[160px]">
                    {displayName}
                  </span>
                  {emailShown && (
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[200px]">
                      {emailShown}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="trust-button-secondary min-h-9 shrink-0 px-3 py-1.5 text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openLoginModal("/dashboard")}
                className="trust-button-primary min-h-9 shrink-0 px-3 py-1.5 text-xs"
              >
                Sign in
              </button>
            ))}
        </div>
      </div>
    </header>
  );
}
