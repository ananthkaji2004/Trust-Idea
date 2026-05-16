"use client";

import { GatedLink } from "@/components/auth/GatedLink";
import { nextStepLinks } from "@/lib/dashboard-routes";

export function NextStepsCard() {
  return (
    <article className="glass-card trust-card-hover h-full min-h-[360px] p-5">
      <h3 className="mb-4 text-sm font-semibold text-zinc-950 dark:text-white">Next Steps</h3>
      <ul className="space-y-2">
        {nextStepLinks.map((step) => (
          <li key={step.label}>
            <GatedLink
              href={step.href}
              actionId="next-step"
              className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:border-violet-500/20 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/15 border border-violet-500/20 text-violet-400 text-xs">
                  →
                </span>
                <span className="truncate">{step.label}</span>
              </span>
              <svg
                className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </GatedLink>
          </li>
        ))}
      </ul>
    </article>
  );
}
