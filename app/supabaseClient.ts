import { createClient } from '@supabase/supabase-js';
import { createServerClient } from "@supabase/auth-helpers-remix";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSupabase(request: Request, response: Response) {
    return createServerClient(supabaseUrl, supabaseAnonKey, { request, response });
}