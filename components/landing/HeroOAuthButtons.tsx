"use client";

import { oauthProviderMeta } from "@/components/auth/OAuthBrandIcons";
import { useOAuthSignIn } from "@/components/auth/useOAuthSignIn";
import { LandingButton } from "./ui/LandingButton";

const OAUTH_NEXT = "/dashboard";

export function HeroOAuthButtons() {
  const { signIn, loading, error } = useOAuthSignIn(OAUTH_NEXT);

  return (
    <div className="hero-enter hero-delay-4 mt-6">
      {error && (
        <p className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {oauthProviderMeta.map(({ id, label, Logo }) => (
          <LandingButton
            key={id}
            variant="oauth"
            className="px-4"
            disabled={loading !== null}
            onClick={() => signIn(id, OAUTH_NEXT)}
            aria-label={`Continue with ${label}`}
          >
            <Logo size={18} className="shrink-0" />
            {loading === id ? "Redirecting…" : label}
          </LandingButton>
        ))}
      </div>
    </div>
  );
}
