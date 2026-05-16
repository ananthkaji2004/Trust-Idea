"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { GoogleLogo } from "@/components/auth/OAuthBrandIcons";
import { useOAuthSignIn } from "@/components/auth/useOAuthSignIn";
import { signInWithEmail } from "@/lib/auth/sign-in";

export function LoginModal() {
  const { loginModalOpen, closeLoginModal, loginNextPath } = useAuth();
  const { signIn, loading: oauthLoading, error: oauthError, isLoading: oauthBusy } =
    useOAuthSignIn(loginNextPath);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  if (!loginModalOpen) return null;

  const error = oauthError ?? emailError;
  const isBusy = oauthBusy || emailLoading;

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailError(null);
    setEmailLoading(true);
    try {
      await signInWithEmail(email.trim(), loginNextPath);
      setEmailSent(true);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Could not send magic link.");
    } finally {
      setEmailLoading(false);
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
            Sign in to unlock exports, AI generation, and saved projects. Continue with Google
            or use a magic link below.
          </p>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={isBusy}
            onClick={() => signIn("google", loginNextPath)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <GoogleLogo size={18} className="shrink-0" />
            {oauthLoading === "google" ? "Redirecting…" : "Continue with Google"}
          </button>

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
                disabled={isBusy}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isBusy}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {emailLoading ? "Sending…" : "Continue with Email"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
