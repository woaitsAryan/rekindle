import { CONTEXT_VARIABLES } from "@/config/constants";
import type { User } from "@supabase/supabase-js";
import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";

export const usageMiddleware = createMiddleware(async (c, next) => {
	const user = c.var[CONTEXT_VARIABLES.User] as User;
	// TODO: Handle usage for the user

	await next();

	// TODO: Update user's usage
});
