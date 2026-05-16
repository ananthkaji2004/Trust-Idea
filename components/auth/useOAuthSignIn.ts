"use client";

import { useCallback, useState } from "react";
import { signInWithProvider, type OAuthProvider } from "@/lib/auth/sign-in";

export function useOAuthSignIn(defaultNextPath: string = "/dashboard") {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (provider: OAuthProvider, nextPath?: string) => {
      setError(null);
      setLoading(provider);
      try {
        await signInWithProvider(provider, nextPath ?? defaultNextPath);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Sign-in failed. Check Supabase provider settings in the dashboard."
        );
        setLoading(null);
      }
    },
    [defaultNextPath]
  );

  const clearError = useCallback(() => setError(null), []);

  return { signIn, loading, error, clearError, isLoading: loading !== null };
}
