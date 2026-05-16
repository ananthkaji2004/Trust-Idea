"use client";

import { useEffect } from "react";
import type { UserGuideStep } from "@/lib/types";

interface UserGuideModalProps {
  open: boolean;
  onClose: () => void;
  steps: UserGuideStep[];
}

export function UserGuideModal({ open, onClose, steps }: UserGuideModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="User guide"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="glass-card relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 shadow-2xl glow-purple">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">User Guide</h2>
            <p className="mt-1 text-sm text-zinc-400">
              How to use your Veridia brand kit
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <ol className="mt-6 space-y-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 text-sm font-bold text-black">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
