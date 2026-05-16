"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useDemoGate } from "@/hooks/useDemoGate";
import type { GatedActionId } from "@/lib/feature-gates";

type GatedLinkProps = {
  href: string;
  actionId: GatedActionId;
  className?: string;
  children: React.ReactNode;
};

export function GatedLink({ href, actionId, className, children }: GatedLinkProps) {
  const pathname = usePathname();
  const { openLoginModal } = useAuth();
  const { checkGatedAction, isAuthenticated } = useDemoGate();

  if (isAuthenticated) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    const { allowed, requireLogin } = checkGatedAction(actionId);
    if (!allowed || requireLogin) {
      e.preventDefault();
      openLoginModal(href);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
