"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGithub() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: "http://localhost:3000/api/auth/callback",
		},
	});
	if (error) {
		throw new Error(error.message);
	}

	if (data.url) {
		redirect(data.url);
	}
}
