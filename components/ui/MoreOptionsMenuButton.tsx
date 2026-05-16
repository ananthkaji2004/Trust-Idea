"use client";

import type { MouseEvent } from "react";

type MoreOptionsMenuButtonProps = {
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function MoreIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 4" fill="currentColor" aria-hidden>
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="8" cy="2" r="1.5" />
      <circle cx="14" cy="2" r="1.5" />
    </svg>
  );
}

export function MoreOptionsMenuButton({ className = "", onClick }: MoreOptionsMenuButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/10 hover:text-zinc-200 transition-colors ${className}`}
      aria-label="More options"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      <MoreIcon />
    </button>
  );
}
