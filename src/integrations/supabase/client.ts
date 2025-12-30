// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// ** FIX: Use the VITE_ prefix and import.meta.env syntax **
// ** This is what the [plugin:vite:import-analysis] expects **
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Sanity check before creating the client
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error("CRITICAL ERROR: Supabase credentials (VITE_...) are not loaded. Check .env file naming and prefixes.");
    // Throw an error that is easier to trace
    throw new Error("Supabase VITE_ variables are missing. Check .env file.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
    }
});