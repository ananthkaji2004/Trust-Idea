"use client";

import { useMemo } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DEMO_ACTION_LIMIT,
  incrementDemoActionCount,
  readDemoActionCount,
  type GatedActionId,
} from "@/lib/feature-gates";

export function useDemoGate() {
  const { user, demoSession } = useAuth();
  const isAuthenticated = Boolean(user ?? demoSession);

  const canProceedWithoutLogin = useMemo(() => {
    if (isAuthenticated) return true;
    return readDemoActionCount() < DEMO_ACTION_LIMIT;
  }, [isAuthenticated]);

  const recordDemoUse = () => {
    if (isAuthenticated) return { allowed: true, count: 0 };
    const count = incrementDemoActionCount();
    return { allowed: count <= DEMO_ACTION_LIMIT, count };
  };

  const checkGatedAction = (actionId: GatedActionId): { allowed: boolean; requireLogin: boolean } => {
    void actionId;
    if (isAuthenticated) return { allowed: true, requireLogin: false };

    if (readDemoActionCount() >= DEMO_ACTION_LIMIT) return { allowed: false, requireLogin: true };

    const { allowed } = recordDemoUse();
    if (!allowed) return { allowed: false, requireLogin: true };
    return { allowed: true, requireLogin: false };
  };

  const demoRemaining = isAuthenticated
    ? DEMO_ACTION_LIMIT
    : Math.max(0, DEMO_ACTION_LIMIT - readDemoActionCount());

  return {
    isAuthenticated,
    canProceedWithoutLogin,
    recordDemoUse,
    checkGatedAction,
    demoRemaining,
    demoLimit: DEMO_ACTION_LIMIT,
  };
}
