import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

/**
 * Returns a Supabase **service-role** client when all creds are available,
 * otherwise `null` so the caller can safely fall back.
 */
export const supabase = supabaseUrl && serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : null

/**
 * Returns a **browser-side** Supabase client when public creds are available,
 * otherwise `null`.
 */
export function createClientSideSupabase() {
  if (!supabaseUrl || !anonKey) return null
  return createClient(supabaseUrl, anonKey)
}
