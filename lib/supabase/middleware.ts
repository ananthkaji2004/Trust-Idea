import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Keeps cookies fresh while optionally rewriting to an internal pathname.
 */
export async function updateSession(request: NextRequest, rewriteTo?: string | null) {
  const rewriteUrl =
    rewriteTo != null ? new URL(`${rewriteTo}${request.nextUrl.search}`, request.url) : null;

  const buildResponse = (): NextResponse => {
    if (rewriteUrl && rewriteUrl.pathname !== request.nextUrl.pathname) {
      return NextResponse.rewrite(rewriteUrl);
    }
    return NextResponse.next({ request });
  };

  let response = buildResponse();

  if (!isSupabaseConfigured()) {
    return response;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = buildResponse();
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}
