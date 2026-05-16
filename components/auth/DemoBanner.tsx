"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useDemoGate } from "@/hooks/useDemoGate";

export function DemoBanner() {
  const { user, openLoginModal, isLoading } = useAuth();
  const { demoRemaining, demoLimit } = useDemoGate();

  if (isLoading || user) return null;

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-amber-700 dark:text-amber-100/90">
        <span className="font-semibold text-amber-800 dark:text-amber-200">Demo mode</span>
        {" — "}
        {demoRemaining} of {demoLimit} premium actions left. Sign in for full access.
      </p>
      <button
        type="button"
        onClick={() => openLoginModal("/dashboard")}
        className="trust-button-primary min-h-9 shrink-0 px-3 py-1.5 text-xs"
      >
        Sign in
      </button>
    </div>
  );
}
