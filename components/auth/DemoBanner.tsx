"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useDemoGate } from "@/hooks/useDemoGate";

export function DemoBanner() {
  const { user, openLoginModal, isLoading } = useAuth();
  const { demoRemaining, demoLimit } = useDemoGate();

  if (isLoading || user) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
      <p className="text-sm text-amber-100/90">
        <span className="font-semibold text-amber-200">Demo mode</span>
        {" — "}
        {demoRemaining} of {demoLimit} premium actions left. Sign in for full access.
      </p>
      <button
        type="button"
        onClick={() => openLoginModal("/dashboard")}
        className="shrink-0 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
      >
        Sign in
      </button>
    </div>
  );
}
