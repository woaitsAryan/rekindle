"use server";

import { getAPI } from "@/lib/supabase/request";

export async function getAllMemories() {
	const API = await getAPI()

	const memories = await API.GET("/memory")

	return memories
}

export async function getMemory(memoryId: string){
	const API = await getAPI()

	const memory = await API.GET(`/memory/${memoryId}`)

	return memory
}
