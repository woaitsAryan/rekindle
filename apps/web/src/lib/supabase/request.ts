import { env } from "@/env";
import { APIHeaders } from "@rekindle/api-schema";
import type { z } from "zod";
import { logger } from "../logger";
import { createClient } from "./server";

export const getAccessToken = async () => {
	const supabase = await createClient();

	const session = await supabase.auth.getSession();

	if (session.error) {
		logger.error(session.error);
		throw new Error(session.error.message);
	}

	if (!session.data.session) {
		logger.error("Session not found!");
		throw new Error("Session not found!");
	}

	return session.data.session.access_token;
};



export class SupabaseAPI {
	private access_token: string | null = null;

	async init() {
		const access_token = await getAccessToken()
		this.access_token = access_token
	}

	async GET<T extends z.ZodType>(
		path: string,
		params?: Record<string, string>,
		validator?: T,
	): Promise<z.infer<T>> {
		if (!this.access_token) {
			throw new Error("Access token not found");
		}
		const response = await fetch(
			`${env.NEXT_PUBLIC_BACKEND_URL}${path}${params ? `?${new URLSearchParams(params)}` : ""}`,
			{
				headers: {
					[APIHeaders.SessionToken]: this.access_token,
				},
			},
		);

		const data = await response.json();

		if (validator) {
			return validator.parse(data);
		}

		return data;
	}

	async POST<T extends z.ZodType>(
		path: string,
		body: Record<string, unknown>,
		params?: Record<string, string>,
		validator?: T,
	): Promise<z.infer<T>> {
		if (!this.access_token) {
			throw new Error("Access token not found");
		}
		const response = await fetch(
			`${env.NEXT_PUBLIC_BACKEND_URL}${path}${params ? `?${new URLSearchParams(params)}` : ""}`,
			{
				method: "POST",
				headers: {
					[APIHeaders.SessionToken]: this.access_token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);

		const data = await response.json();

		if (validator) {
			return validator.parse(data);
		}

		return data;
	}
}

let SupabaseAPISingleton: SupabaseAPI | null = null

export async function getAPI(): Promise<SupabaseAPI> {
	if (!SupabaseAPISingleton) {
		const api = new SupabaseAPI()
		await api.init()
		SupabaseAPISingleton = api
	}
	return SupabaseAPISingleton
}