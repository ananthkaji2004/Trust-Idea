import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
};

export function GlassCard({
  children,
  className = "",
  hover = true,
  id,
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={`glass-card p-6 transition-all duration-300 ${
        hover
          ? "hover:border-white/20 hover:bg-white/[0.08] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
