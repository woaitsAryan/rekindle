import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

const supabase = createClient(
	ENV.NEXT_PUBLIC_SUPABASE_URL,
	ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	},
);

export { supabase };
