import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "trust-button-primary",
  secondary: "trust-button-secondary",
  ghost: "trust-button-ghost",
};

export function GlowButton({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: GlowButtonProps) {
  const base = "trust-button";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
