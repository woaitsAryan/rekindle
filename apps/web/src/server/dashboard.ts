'use server'

import { getAccessToken, SupabaseAPI } from "@/lib/supabase/request"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function makeRequest(){
	const access_token = await getAccessToken()	
	const api = new SupabaseAPI(access_token)

	const um = await api.GET("/v1/protected")

	console.log(um)

}