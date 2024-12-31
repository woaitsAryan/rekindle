import { CONTEXT_VARIABLES } from "@/config/constants";
import type { User } from "@supabase/supabase-js";
import { createMiddleware } from "hono/factory";

export const usageMiddleware = createMiddleware(async (c, next) => {
	const user = c.var[CONTEXT_VARIABLES.Customer] as User;
	// TODO: Handle usage for the user

	await next();

	// TODO: Update user's usage
});
