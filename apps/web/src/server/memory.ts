"use server";

import { getAPI } from "@/lib/supabase/request";
import { APIRoutes } from "@rekindle/api-schema";
import { interpretPath } from "@rekindle/api-schema/utils";

export async function getAllMemories() {
	const API = await getAPI();

	const memories = await API.GET(APIRoutes.Memory.GetAll);

	return memories;
}

export async function getMemory(memoryId: string) {
	const API = await getAPI();

	const path = interpretPath(APIRoutes.Memory.Get, { memoryId });

	const memory = await API.GET(path);

	return memory;
}
