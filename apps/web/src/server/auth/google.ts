"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/env";
 
export async function signInWithGoogle() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: `${env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/callback?next=/on-login`,
		},
	});
	if (error) {
		throw new Error(error.message);
	}
	if (data.url) {
		redirect(data.url);
	}
}
