import type { AuthenticatedEnv } from "@/types/variable";
import type { User } from "@supabase/supabase-js";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { supabase } from "../config/client";
import { CONTEXT_VARIABLES } from "../config/constants";
import { logger } from "../config/logger";

const authMiddleware = createMiddleware<AuthenticatedEnv>(async (c, next) => {
	const auth_token = c.req.header().authorization;
	if (!auth_token) {
		logger.error("Authorization header not set");
		throw new HTTPException(401, { message: "Authorization header not set" });
	}

	const response = await supabase.auth.getUser(auth_token);

	if (!response || !response.data || !response.data.user) {
		logger.error("User not found");
		throw new HTTPException(404, { message: "User not found" });
	}

	if (response.error) {
		logger.error(response.error);
		throw new HTTPException(404, { message: response.error.message });
	}

	c.set(CONTEXT_VARIABLES.User, response.data.user);
	await next();
});

export { authMiddleware };
