"use server";

import { SupabaseAPI } from "@/lib/supabase/request";

export async function makeRequest() {
	const api = new SupabaseAPI();
	await api.init()

	const inputBody = {
		messages: [
			{
				content: "Hey how are you doing",
				role: "user",
			},
		],
	};

	const um = await api.POST("/chat", inputBody);

	console.log(um);
}
