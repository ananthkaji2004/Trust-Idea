"use client";

import { GatedButton } from "@/components/auth/FeatureGate";

export function CreateNewForm() {
  return (
    <article className="glass-card p-6 max-w-xl">
      <p className="text-sm text-zinc-400">
        Describe your business idea to generate a launch-ready brand kit with visuals, copy, and trust
        scoring.
      </p>
      <GatedButton
        actionId="start-project"
        className="mt-4 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        onAllowedClick={() => {
          // Project creation flow will connect here.
        }}
      >
        Start New Project
      </GatedButton>
    </article>
  );
}
