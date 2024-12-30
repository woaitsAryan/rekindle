"use server";

import { getAPI } from "@/lib/supabase/request";

export async function makeRequest() {
	const api = await getAPI()

	const inputBody = {
		messages: [
			{
				content: "Hey how are you doing",
				role: "user",
			},
		],
	};

	const response = await api.POST("/chat", inputBody);

	console.log(response);
}
