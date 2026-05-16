"use client";

import { useCallback } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DEMO_ACTION_LIMIT,
  incrementDemoActionCount,
  readDemoActionCount,
  type GatedActionId,
} from "@/lib/feature-gates";

export function useDemoGate() {
  const { user } = useAuth();

  const isAuthenticated = !!user;

  const canProceedWithoutLogin = useCallback(() => {
    if (isAuthenticated) return true;
    return readDemoActionCount() < DEMO_ACTION_LIMIT;
  }, [isAuthenticated]);

  const recordDemoUse = useCallback(() => {
    if (isAuthenticated) return { allowed: true, count: 0 };
    const count = incrementDemoActionCount();
    return { allowed: count <= DEMO_ACTION_LIMIT, count };
  }, [isAuthenticated]);

  const checkGatedAction = useCallback(
    (actionId: GatedActionId): { allowed: boolean; requireLogin: boolean } => {
      if (isAuthenticated) {
        return { allowed: true, requireLogin: false };
      }
      if (readDemoActionCount() >= DEMO_ACTION_LIMIT) {
        return { allowed: false, requireLogin: true };
      }
      const { allowed } = recordDemoUse();
      if (!allowed) {
        return { allowed: false, requireLogin: true };
      }
      void actionId;
      return { allowed: true, requireLogin: false };
    },
    [isAuthenticated, recordDemoUse]
  );

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
