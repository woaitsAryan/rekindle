import type { AuthenticatedEnv } from "@/types/variable";
import { APIHeaders } from "@rekindle/api-schema";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { CONTEXT_VARIABLES } from "../config/constants";
import { logger } from "../config/logger";
import { supabase } from "../config/supabase-client";

const authMiddleware = createMiddleware<AuthenticatedEnv>(async (c, next) => {
	const auth_token = c.req.header(APIHeaders.SessionToken);
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

	c.set(CONTEXT_VARIABLES.Customer, response.data.user);
	await next();
});

export { authMiddleware };
