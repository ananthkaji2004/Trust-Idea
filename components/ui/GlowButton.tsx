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
  primary:
    "bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold hover:from-emerald-400 hover:to-emerald-500 glow-emerald",
  secondary:
    "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-purple-400/50",
  ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5",
};

export function GlowButton({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: GlowButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070d] disabled:opacity-50 disabled:cursor-not-allowed";

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
