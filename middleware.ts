import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Public-facing URLs rewritten to `/dashboard/*` while keeping navbar links pretty */
const ROUTE_ALIAS: Record<string, string> = {
  "/guide": "/dashboard/guide",
  "/documents": "/dashboard/documents",
  "/projects": "/dashboard/my-projects",
  "/brand-kit": "/dashboard/brand-kit",
  "/multilingual-kit": "/dashboard/multilingual",
  "/ai-trust-score": "/dashboard/trust-score",
  "/3d-brand-reality": "/dashboard/brand-reality",
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const mapped = ROUTE_ALIAS[pathname];
  return await updateSession(request, mapped ?? null);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
