import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseEnvReady } from "@/src/lib/supabase";

/** Browser client — never throws at construction; guarded by `isSupabaseConfigured` before real calls */
export function createClient(): SupabaseClient {
  return getSupabaseBrowserClient();
}

export const isSupabaseConfigured = isSupabaseEnvReady;
