"use client";

import { OAuthProviderChip } from "@/components/auth/OAuthProviderChip";
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
      <OAuthProviderChip
        className={className}
        disabled={loading !== null}
        ariaLabel={`Continue with ${label}`}
        onPrimaryClick={() => signIn(provider, nextPath)}
      >
        <Logo size={18} className="shrink-0" />
        {showLabel && (isLoading ? "Redirecting…" : label)}
      </OAuthProviderChip>
      {error && loading === null && (
        <p className="sr-only" role="alert">
          {error}
        </p>
      )}
    </>
  );
}
