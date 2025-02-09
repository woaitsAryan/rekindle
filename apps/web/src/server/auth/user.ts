"use server";

import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getSupabaseUser(): Promise<User | null> {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		logger.error(error);
		return null;
	}

	if (!data.user) {
		logger.error("Customer does not exist");
		return null;
	}

	return data.user;
}
