"use client";

import { usePathname } from "next/navigation";
import { useCallback, type MouseEvent, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useDemoGate } from "@/hooks/useDemoGate";
import type { GatedActionId } from "@/lib/feature-gates";

type FeatureGateProps = {
  actionId: GatedActionId;
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export function FeatureGate({ actionId, children, className }: FeatureGateProps) {
  const pathname = usePathname();
  const { openLoginModal } = useAuth();
  const { checkGatedAction, isAuthenticated } = useDemoGate();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (isAuthenticated) return;

      const { allowed, requireLogin } = checkGatedAction(actionId);
      if (!allowed || requireLogin) {
        e.preventDefault();
        e.stopPropagation();
        openLoginModal(pathname);
      }
    },
    [actionId, checkGatedAction, isAuthenticated, openLoginModal, pathname]
  );

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <span className={className} onClick={handleClick} onClickCapture={handleClick}>
      {children}
    </span>
  );
}

type GatedButtonProps = {
  actionId: GatedActionId;
  onAllowedClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
};

export function GatedButton({
  actionId,
  onAllowedClick,
  children,
  className,
  type = "button",
}: GatedButtonProps) {
  const pathname = usePathname();
  const { openLoginModal } = useAuth();
  const { checkGatedAction, isAuthenticated } = useDemoGate();

  const handleClick = () => {
    if (isAuthenticated) {
      onAllowedClick?.();
      return;
    }

    const { allowed, requireLogin } = checkGatedAction(actionId);
    if (!allowed || requireLogin) {
      openLoginModal(pathname);
      return;
    }

    onAllowedClick?.();
  };

  return (
    <button type={type} className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
