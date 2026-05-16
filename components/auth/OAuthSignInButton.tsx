"use client";

import { LandingButton } from "@/components/landing/ui/LandingButton";
import { oauthProviderMeta } from "@/components/auth/OAuthBrandIcons";
import { useOAuthSignIn } from "@/components/auth/useOAuthSignIn";
import type { OAuthProvider } from "@/lib/auth/sign-in";

type OAuthSignInButtonProps = {
  provider: OAuthProvider;
  nextPath?: string;
  className?: string;
  showLabel?: boolean;
};

export function OAuthSignInButton({
  provider,
  nextPath = "/dashboard",
  className = "",
  showLabel = true,
}: OAuthSignInButtonProps) {
  const { signIn, loading, error } = useOAuthSignIn(nextPath);
  const meta = oauthProviderMeta.find((p) => p.id === provider);
  if (!meta) return null;

  const { Logo, label } = meta;
  const isLoading = loading === provider;

  return (
    <>
      <LandingButton
        variant="oauth"
        className={`px-4 ${className}`}
        disabled={loading !== null}
        onClick={() => signIn(provider, nextPath)}
        aria-label={`Continue with ${label}`}
      >
        <Logo size={18} className="shrink-0" />
        {showLabel && (isLoading ? "Redirecting…" : label)}
      </LandingButton>
      {error && loading === null && (
        <p className="sr-only" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
