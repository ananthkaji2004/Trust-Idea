import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline" | "oauth";

type LandingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.55)] hover:scale-[1.03] border border-violet-500/30",
  ghost:
    "bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
  outline:
    "bg-transparent text-zinc-100 border border-violet-500/40 hover:border-violet-400/60 hover:bg-violet-500/10 hover:scale-[1.02]",
  oauth:
    "bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white gap-2",
};

export function LandingButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  href,
  ...props
}: LandingButtonProps) {
  const styles = `inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} {...props}>
      {children}
    </button>
  );
}
