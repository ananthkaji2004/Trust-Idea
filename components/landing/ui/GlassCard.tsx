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
      className={`trust-card transition-all duration-300 ${
        hover
          ? "trust-card-hover"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
