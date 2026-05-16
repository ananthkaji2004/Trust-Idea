/** Supabase OAuth callback URL for Google Cloud Console (not localhost). */
export function getSupabaseGoogleRedirectUri(): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return "https://YOUR_REF.supabase.co/auth/v1/callback";
  return `${base}/auth/v1/callback`;
}
