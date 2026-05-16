"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseGoogleRedirectUri } from "@/lib/auth/config";

type AuthErrorInfo = {
  title: string;
  body: React.ReactNode;
};

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
            Google redirected correctly, but Supabase failed to complete sign-in. Usually the
            Client ID or Client Secret in Supabase does not match Google Cloud.
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
              <code className="text-red-50">http://localhost:3005/auth/callback</code>
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
    if (authError === "exchange" || authError === "1") {
      const redirectUri = getSupabaseGoogleRedirectUri();
      const isExchange = authError === "exchange";
      setErrorInfo(
        isExchange
          ? (parseHashAuthError() ?? {
              title: "Google sign-in: Supabase could not verify your account",
              body: (
                <>
                  <span className="block mb-2">
                    Re-paste the Google Client ID and Secret in Supabase (same OAuth client as Google
                    Cloud). Redirect URI in Google only:{" "}
                    <code className="text-red-50 break-all">{redirectUri}</code>
                  </span>
                  <span className="block text-xs text-red-100/90">
                    Supabase → Redirect URLs:{" "}
                    <code className="text-red-50">http://localhost:YOUR_PORT/auth/callback</code>
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
