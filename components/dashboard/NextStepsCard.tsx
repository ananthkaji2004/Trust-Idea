import Link from "next/link";
import { nextStepLinks } from "@/lib/dashboard-routes";

export function NextStepsCard() {
  return (
    <article className="glass-card p-5 h-full">
      <h3 className="text-sm font-semibold text-white mb-4">Next Steps</h3>
      <ul className="space-y-1">
        {nextStepLinks.map((step) => (
          <li key={step.label}>
            <Link
              href={step.href}
              className="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors group"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/15 border border-violet-500/20 text-violet-400 text-xs">
                  →
                </span>
                {step.label}
              </span>
              <svg
                className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
