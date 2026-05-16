import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    const reason =
      error.message?.toLowerCase().includes("exchange") ||
      error.message?.toLowerCase().includes("external")
        ? "exchange"
        : "1";
    return NextResponse.redirect(`${origin}/?auth_error=${reason}`);
  }

  return NextResponse.redirect(`${origin}/?auth_error=1`);
}
