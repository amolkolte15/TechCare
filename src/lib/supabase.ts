import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error(
    'Missing environment variable: VITE_SUPABASE_URL. Please connect to Supabase using the "Connect to Supabase" button.'
  );
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing environment variable: VITE_SUPABASE_ANON_KEY. Please connect to Supabase using the "Connect to Supabase" button.'
  );
}

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);