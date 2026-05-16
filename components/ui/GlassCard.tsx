import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "emerald" | "purple" | "none";
}

export function GlassCard({
  children,
  className = "",
  glow = "none",
}: GlassCardProps) {
  const glowClass =
    glow === "emerald"
      ? "hover:glow-emerald"
      : glow === "purple"
        ? "hover:glow-purple"
        : "";

  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:border-white/20 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
