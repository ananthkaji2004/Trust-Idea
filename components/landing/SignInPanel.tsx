"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

const providers = [
  { id: "google", label: "Continue with Google", icon: "G" },
  { id: "email", label: "Continue with Email", icon: "✉" },
] as const;

export function SignInPanel() {
  const [demoMessage, setDemoMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  function handleSignIn(provider: string) {
    setDemoMessage(
      `Demo only — ${provider} sign-in is not configured. No authentication APIs are connected.`,
    );
  }

  return (
    <div
      id="sign-in"
      className="glass-panel neon-border scroll-mt-24 rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">Sign in to Trust Idea</h3>
        <Badge variant="purple">Demo</Badge>
      </div>
      <p className="mb-4 text-xs text-zinc-500">
        Use any provider below — all actions are placeholder only.
      </p>

      <div className="space-y-2">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSignIn(p.label)}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-violet-400/40 hover:bg-violet-500/10"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs">
              {p.icon}
            </span>
            {p.label}
          </button>
        ))}
      </div>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-zinc-500">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <label className="mb-2 block text-xs text-zinc-400">Email address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="mb-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
      />
      <button
        type="button"
        onClick={() => handleSignIn("Email")}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600/80 to-indigo-600/80 py-3 text-sm font-semibold text-white transition hover:from-violet-500 hover:to-cyan-500/80"
      >
        Send magic link
      </button>

      {demoMessage && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs text-violet-200"
        >
          {demoMessage}
        </p>
      )}
    </div>
  );
}
