import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "emerald" | "purple" | "neutral";
}

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  const styles = {
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    neutral: "border-white/10 bg-white/5 text-zinc-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
