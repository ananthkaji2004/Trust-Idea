import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type OAuthProvider = "google";

export function getAuthCallbackUrl(nextPath: string = "/dashboard") {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const next = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

export async function signInEmailPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpEmailPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export async function signInWithProvider(provider: OAuthProvider, nextPath: string = "/dashboard") {
  if (!isSupabaseConfigured()) {
    throw new Error("Configure Supabase credentials to unlock Google SSO.");
  }
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getAuthCallbackUrl(nextPath),
    },
  });
  if (error) throw error;
  if (data?.url) {
    window.location.href = data.url;
  }
}

export async function signInWithEmail(email: string, nextPath: string = "/dashboard") {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getAuthCallbackUrl(nextPath),
    },
  });
  if (error) throw error;
}
