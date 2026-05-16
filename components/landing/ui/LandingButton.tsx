"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { scrollToLandingSection } from "@/lib/landing-scroll";
type Variant = "primary" | "ghost" | "outline" | "oauth";

type LandingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
};

const variantStyles: Record<Variant, string> = {
  primary: "trust-button-primary",
  ghost: "trust-button-ghost",
  outline: "trust-button-secondary",
  oauth: "trust-button-secondary gap-2",
};

export function LandingButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  href,
  onClick,
  ...props
}: LandingButtonProps) {
  const pathname = usePathname();
  const styles = `${variantStyles[variant]} ${className}`;

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (pathname !== "/") return;
    const id = hash.replace(/^#/, "");
    if (!id) return;
    e.preventDefault();
    scrollToLandingSection(id);
    onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);
  };

  if (href?.startsWith("#")) {
    return (
      <Link href={href} className={styles} onClick={(e) => handleHashClick(e, href)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
