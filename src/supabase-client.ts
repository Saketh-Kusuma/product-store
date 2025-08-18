import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lsjmkftjcqjispfuavio.supabase.co";
const supabaseKey = import.meta.env.VITE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
