import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE!;

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});

export const supabaseAnon = createClient(url, anonKey, {
  auth: { persistSession: false },
});
