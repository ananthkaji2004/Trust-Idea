"use client";

import { useState, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { signInWithEmail, signInWithProvider, type OAuthProvider } from "@/lib/auth/sign-in";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.26-.675-2.52-.93-2.52-2.04 0-.465.165-.915.48-1.23 2.1-2.295 1.395-5.79.105-7.2-.99-1.17-2.685-1.23-3.15-1.23-.255 0-.75.015-1.14.435-.885.96-1.23 2.85-1.23 2.85-.36 1.14-1.05 2.22-1.89 2.865-.57.45-1.665 1.395-1.56 2.79.105 1.455.765 2.04 1.68 2.685 1.23.93 3.315 1.23 4.59.39 1.35-.885 1.89-2.295 1.89-2.295.33.63 1.26 1.17 2.1 1.395.63.18 1.305.24 1.965.18 1.23-.09 2.385-.495 2.385-.495 0 1.395.015 2.745.015 3.15 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 15.25 3.6 10.54 6.32 7.45c1.35-1.6 3.28-2.51 5.15-2.39 1.21.07 2.08.63 3.15.63 1.04 0 1.87-.51 3.18-.55 1.35-.03 2.61.74 3.5 1.88-3.08 1.88-2.58 6.05.52 7.35-.63 1.64-1.45 3.25-2.77 4.91zM14.02 4.2c.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

const oauthProviders: { id: OAuthProvider; label: string; icon: ReactNode }[] = [
  { id: "google", label: "Google", icon: <GoogleIcon /> },
  { id: "github", label: "GitHub", icon: <GitHubIcon /> },
  { id: "apple", label: "Apple", icon: <AppleIcon /> },
];

export function LoginModal() {
  const { loginModalOpen, closeLoginModal, loginNextPath } = useAuth();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!loginModalOpen) return null;

  const handleOAuth = async (provider: OAuthProvider) => {
    setError(null);
    setLoading(provider);
    try {
      await signInWithProvider(provider, loginNextPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Check Supabase provider settings.");
      setLoading(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setLoading("email");
    try {
      await signInWithEmail(email.trim(), loginNextPath);
      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send magic link.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeLoginModal}
        aria-label="Close"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="relative z-10 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-card w-full p-6 shadow-2xl border border-white/10">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 id="login-modal-title" className="text-lg font-semibold text-white">
              Sign in to TRUST IDEA
            </h2>
            <button
              type="button"
              onClick={closeLoginModal}
              className="shrink-0 rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-white/10"
              aria-label="Close dialog"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-zinc-400 mb-6">
            Sign in to unlock exports, AI generation, and saved projects. Choose any provider you use.
          </p>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {oauthProviders.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={!!loading}
                onClick={() => handleOAuth(p.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/10 disabled:opacity-50"
              >
                {p.icon}
                {loading === p.id ? "…" : p.label}
              </button>
            ))}
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-zinc-500">or email</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {emailSent ? (
            <p className="text-sm text-emerald-400 text-center py-2">
              Check your email for a magic link to continue.
            </p>
          ) : (
            <form onSubmit={handleEmail} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading === "email"}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading === "email" ? "Sending…" : "Continue with Email"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
