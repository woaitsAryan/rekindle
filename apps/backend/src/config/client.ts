import { createClient } from '@supabase/supabase-js'
import { ENV } from './env'

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
		detectSessionInUrl: false
	}
})

export { supabase }