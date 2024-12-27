"use server";

import { SupabaseAPI, getAccessToken } from "@/lib/supabase/request";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function makeRequest() {
	const access_token = await getAccessToken();
	const api = new SupabaseAPI(access_token);

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
