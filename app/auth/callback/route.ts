import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/?auth_error=supabase`);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase OAuth code exchange failed:", error.message);
    }
    const msg = error.message?.toLowerCase() ?? "";
    const reason =
      msg.includes("exchange")
      || msg.includes("external")
      || msg.includes("provider")
      || msg.includes("oauth")
      || msg.includes("invalid_client")
      || msg.includes("unsupported")
        ? "google_config"
        : "1";
    return NextResponse.redirect(`${origin}/?auth_error=${reason}`);
  }

  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
