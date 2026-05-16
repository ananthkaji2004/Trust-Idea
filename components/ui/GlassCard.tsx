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
      className={`trust-card transition-all duration-300 trust-card-hover ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
