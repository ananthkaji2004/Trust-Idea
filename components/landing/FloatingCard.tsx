"use client";

import { type CSSProperties, type ReactNode } from "react";

export type FloatingCardData = {
  id: string;
  label: string;
  gradient: string;
  position: string;
  animation: string;
  delay?: string;
  children?: ReactNode;
  score?: string;
};

type FloatingCardProps = {
  card: FloatingCardData;
  parallaxStyle?: CSSProperties;
  className?: string;
};

export function FloatingCard({ card, parallaxStyle, className = "" }: FloatingCardProps) {
  return (
    <div
      className={`group absolute ${card.position} ${card.animation} ${className}`}
      style={{ ...parallaxStyle, animationDelay: card.delay }}
    >
      <div
        className="preserve-3d cursor-pointer transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-1 group-hover:z-50
          group-hover:shadow-[0_24px_70px_rgba(168,85,247,0.5),0_0_40px_rgba(59,130,246,0.35)]
          [transform-style:preserve-3d] group-hover:[transform:translateZ(28px)_scale(1.08)]"
      >
        <div className="glass-card w-28 sm:w-32 md:w-36 overflow-hidden p-0 shadow-lg border-violet-500/20">
          <div className={`h-16 sm:h-20 ${card.gradient}`} />
          <div className="p-2.5 sm:p-3">
            <p className="text-[10px] sm:text-xs font-medium text-zinc-300 leading-tight">
              {card.label}
            </p>
            {card.score && (
              <p className="mt-1 text-xs font-bold neon-text">{card.score}</p>
            )}
            {card.children}
          </div>
        </div>
      </div>
    </div>
  );
}
