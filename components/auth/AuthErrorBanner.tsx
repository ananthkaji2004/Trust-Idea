"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseGoogleRedirectUri } from "@/lib/auth/config";

type AuthErrorInfo = {
  title: string;
  body: ReactNode;
};

function getAppCallbackExample() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (typeof window === "undefined") {
    return fromEnv ? `${fromEnv}/auth/callback` : "http://localhost:3000/auth/callback";
  }
  return `${window.location.origin}/auth/callback`;
}

function parseHashAuthError(): AuthErrorInfo | null {
  if (typeof window === "undefined" || !window.location.hash.includes("error=")) {
    return null;
  }

  const params = new URLSearchParams(window.location.hash.slice(1));
  const code = params.get("error_code") ?? "";
  const description = decodeURIComponent(params.get("error_description") ?? "");

  if (code === "unexpected_failure" || description.includes("exchange external code")) {
    const redirectUri = getSupabaseGoogleRedirectUri();
    return {
      title: "Google sign-in: Supabase could not verify your account",
      body: (
        <>
          <span className="block mb-2">
            Google login is not enabled correctly yet. Use email login while OAuth settings are fixed.
          </span>
          <span className="block font-medium text-red-100 mb-1">Fix checklist:</span>
          <ol className="list-decimal list-inside space-y-1 text-red-100/90 text-xs">
            <li>
              Supabase → Authentication → Providers → Google: re-paste Client ID and Secret from
              the same Google OAuth client
            </li>
            <li>
              Google Cloud → Authorized redirect URI (only):{" "}
              <code className="text-red-50 break-all">{redirectUri}</code>
            </li>
            <li>
              Supabase → URL configuration → Redirect URLs: add your app URL, e.g.{" "}
              <code className="text-red-50 break-all">{getAppCallbackExample()}</code>
            </li>
          </ol>
        </>
      ),
    };
  }

  return {
    title: "Sign-in could not be completed",
    body: description || params.get("error") || "Unknown authentication error.",
  };
}

function clearAuthHashAndQuery() {
  const url = new URL(window.location.href);
  url.hash = "";
  url.searchParams.delete("auth_error");
  window.history.replaceState({}, "", url.pathname + url.search);
}

export function AuthErrorBanner() {
  const searchParams = useSearchParams();
  const [errorInfo, setErrorInfo] = useState<AuthErrorInfo | null>(null);

  useEffect(() => {
    const hashError = parseHashAuthError();
    if (hashError) {
      setErrorInfo(hashError);
      clearAuthHashAndQuery();
      return;
    }

    const authError = searchParams.get("auth_error");
    if (authError === "supabase") {
      setErrorInfo({
        title: "Supabase is not configured",
        body: (
          <>
            Add <code className="text-red-50">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-red-50">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
            <code className="text-red-50">.env.local</code>, restart the dev server, then sign in again.
          </>
        ),
      });
      clearAuthHashAndQuery();
      return;
    }

    if (authError === "google_config" || authError === "exchange" || authError === "1") {
      const redirectUri = getSupabaseGoogleRedirectUri();
      const isExchange = authError === "google_config" || authError === "exchange";
      setErrorInfo(
        isExchange
          ? (parseHashAuthError() ?? {
              title: "Google sign-in: Supabase could not verify your account",
              body: (
                <>
                  <span className="block mb-2">
                    Google login is not enabled correctly yet. Use email login.
                  </span>
                  <span className="block mb-2 text-xs text-red-100/90">
                    Re-paste Google Client ID + Secret in Supabase and keep this Google redirect URI:{" "}
                    <code className="text-red-50 break-all">{redirectUri}</code>
                  </span>
                  <span className="block text-xs text-red-100/90">
                    Supabase → Redirect URLs:{" "}
                    <code className="text-red-50 break-all">{getAppCallbackExample()}</code>
                  </span>
                </>
              ),
            })
          : {
              title: "Sign-in could not be completed",
              body: (
                <>
                  Check Google Cloud Authorized redirect URI:{" "}
                  <code className="text-red-50 break-all">{redirectUri}</code> and add{" "}
                  <code className="text-red-50">/auth/callback</code> under Supabase URL settings
                  for your dev port.
                </>
              ),
            },
      );
      clearAuthHashAndQuery();
      return;
    }

    if (authError) {
      setErrorInfo({
        title: "Sign-in could not be completed",
        body: (
          <>
            Try signing in again or use email. Confirm your app callback is listed under Supabase → URL
            configuration → Redirect URLs:{" "}
            <code className="text-red-50 break-all">{getAppCallbackExample()}</code>
          </>
        ),
      });
      clearAuthHashAndQuery();
    }
  }, [searchParams]);

  if (!errorInfo) return null;

  return (
    <div
      role="alert"
      className="fixed top-20 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-lg backdrop-blur-md max-h-[70vh] overflow-y-auto"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-red-100 mb-1">{errorInfo.title}</p>
          <div className="text-red-200/90">{errorInfo.body}</div>
        </div>
        <button
          type="button"
          onClick={() => setErrorInfo(null)}
          className="shrink-0 text-red-300 hover:text-white text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
