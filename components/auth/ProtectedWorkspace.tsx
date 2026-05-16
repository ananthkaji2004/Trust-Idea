"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

/**
 * Locks sensitive workspace pages until authentication finishes.
 */
export function ProtectedWorkspace({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, openLoginModal } = useAuth();
  const pathname = usePathname() || "/dashboard";

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      openLoginModal(pathname);
    }
  }, [isAuthenticated, isLoading, openLoginModal, pathname]);

  if (isLoading) {
    return (
      <div className="rounded-3xl glass-card border border-white/10 p-8 animate-pulse min-h-[40vh]">
        <div className="h-4 w-32 rounded-full bg-white/10 mb-6" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded-full bg-white/10" />
          <div className="h-3 w-11/12 rounded-full bg-white/10" />
          <div className="h-3 w-10/12 rounded-full bg-white/10" />
        </div>
        <span className="sr-only">Preparing dashboard</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-4 rounded-[32px] border border-white/10 bg-black/55 backdrop-blur-2xl" />
        <div className="relative z-10 max-w-lg text-center px-6 py-14">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300">Secure Workspace</p>
          <h2 className="text-2xl font-semibold text-white mt-4">Authenticate to reveal your Fal lab</h2>
          <p className="text-sm text-zinc-400 mt-3">
            Continue with Gmail, classic email/password, or Demo Login to keep iterating without interruptions.
          </p>
          <button
            type="button"
            className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:opacity-90"
            onClick={() => openLoginModal(pathname)}
          >
            Open secure login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
