"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { GoogleLogo } from "@/components/auth/OAuthBrandIcons";
import { useOAuthSignIn } from "@/components/auth/useOAuthSignIn";
import {
  signInEmailPassword,
  signUpEmailPassword,
} from "@/lib/auth/sign-in";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LoginModal() {
  const {
    loginModalOpen,
    closeLoginModal,
    loginNextPath,
    enableDemoLogin,
  } = useAuth();
  const { signIn: signInOAuth, loading: oauthLoading, error: oauthErrorRaw, isLoading: oauthBusy } =
    useOAuthSignIn(loginNextPath);

  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const supabaseConfigured = useMemo(() => isSupabaseConfigured(), []);

  if (!loginModalOpen) return null;

  const oauthTranslated = oauthErrorRaw
    ? /provider|unsupported|enabled|sso|google/i.test(oauthErrorRaw)
      ? "Google login is not enabled yet. Use email login."
      : oauthErrorRaw
    : null;

  const error = banner ?? oauthTranslated;
  const isBusy = oauthBusy || authBusy;

  const resetBanner = () => setBanner(null);

  const handlePasswordAuth = async (e: FormEvent) => {
    e.preventDefault();
    resetBanner();

    if (!supabaseConfigured) {
      setBanner("Supabase is not configured locally — Demo Login stays available.");
      return;
    }

    if (!email.trim() || !password) {
      setBanner("Add both email and password to continue.");
      return;
    }

    setAuthBusy(true);
    try {
      if (tab === "register") {
        await signUpEmailPassword(email.trim(), password);
        setBanner(
          "Check your inbox to confirm signup (required by Supabase) — once confirmed use Login below."
        );
        setTab("login");
      } else {
        await signInEmailPassword(email.trim(), password);
      }
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Could not authenticate.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleGoogle = async () => {
    resetBanner();
    if (!supabaseConfigured) {
      setBanner("Configure Supabase to unlock Google SSO. Use Demo Login meanwhile.");
      return;
    }

    await signInOAuth("google", loginNextPath);
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
        className="relative z-10 w-full max-w-lg"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="glass-card max-h-[92vh] w-full overflow-y-auto border border-white/10 p-5 shadow-[0_0_80px_rgba(168,85,247,0.25)] sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="trust-kicker mb-2">Trusted access</p>
              <h2 id="login-modal-title" className="text-xl font-semibold text-zinc-950 dark:text-white">
                Enter your TRUST IDEA workspace
              </h2>
            </div>
            <button
              type="button"
              onClick={closeLoginModal}
              className="shrink-0 rounded-xl p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Close dialog"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-8 flex rounded-2xl border border-zinc-200/80 bg-zinc-100/80 p-1 dark:border-white/10 dark:bg-black/40">
            {(["login", "register"] as const).map((mode) => {
              const active = tab === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  disabled={isBusy}
                  onClick={() => {
                    resetBanner();
                    setTab(mode);
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {mode === "login" ? "Email login" : "Register"}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-700 dark:text-amber-50">
              {error}
            </div>
          )}

          {!supabaseConfigured && (
            <div className="mb-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs text-blue-700 dark:text-blue-50">
              Supabase credentials are offline — Demo Login spins up Fal Visual Lab previews instantly.
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              disabled={isBusy}
              onClick={handleGoogle}
              className="trust-button-secondary w-full py-3"
            >
              <GoogleLogo size={20} />
              <span>Gmail / Google</span>
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={enableDemoLogin}
              className="trust-button-primary w-full py-3"
            >
              <span aria-hidden>✨</span>
              Demo login (instant sandbox)
            </button>
          </div>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Or email</span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>

          <form className="space-y-5" onSubmit={handlePasswordAuth}>
            <div>
              <label className="text-xs font-semibold text-zinc-500" htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="founder@you.com"
                disabled={isBusy}
                required
                className="trust-input mt-2 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500" htmlFor="auth-password">
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                autoComplete={tab === "register" ? "new-password" : "current-password"}
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="••••••••"
                disabled={isBusy}
                required
                className="trust-input mt-2 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy || !supabaseConfigured}
              className="trust-button-primary w-full py-3 disabled:opacity-40"
            >
              {tab === "register"
                ? authBusy
                  ? "Creating account…"
                  : "Register & Continue"
                : authBusy
                  ? "Signing in…"
                  : "Login securely"}
            </button>
          </form>

          <p className="text-[11px] text-zinc-500 mt-6">
            Prefer magic links instead? Ping the team — password auth keeps demos snappy offline.
          </p>
        </div>
      </div>
    </div>
  );
}
