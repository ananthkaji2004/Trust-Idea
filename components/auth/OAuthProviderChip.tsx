"use client";

import type { MouseEvent, ReactNode } from "react";

type OAuthProviderChipProps = {
  children: ReactNode;
  onPrimaryClick?: () => void;
  onMenuClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
};

function ChipMoreIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 4" fill="currentColor" aria-hidden>
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="14" cy="2" r="1.5" />
    </svg>
  );
}

export function OAuthProviderChip({
  children,
  onPrimaryClick,
  onMenuClick,
  disabled,
  ariaLabel,
  className = "",
}: OAuthProviderChipProps) {
  return (
    <div
      className={`relative inline-flex rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onPrimaryClick}
        aria-label={ariaLabel}
        className="inline-flex items-center gap-2 rounded-xl py-2.5 pl-4 pr-10"
      >
        {children}
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-label="More options"
        onClick={(e) => {
          e.stopPropagation();
          onMenuClick?.(e);
        }}
        className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/10 hover:text-zinc-200 transition-colors"
      >
        <ChipMoreIcon />
      </button>
    </div>
  );
}
