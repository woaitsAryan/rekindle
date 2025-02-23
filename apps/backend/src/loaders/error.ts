import { logger } from "@/loaders/logger";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

function handleGlobalError(err: Error, c: Context): Promise<Response> {
	logger.error("Global Error", err);

	if (err instanceof HTTPException) {
		const status = err.status;

		return Promise.resolve(
			c.json({ success: false, message: err.message }, { status: status }),
		);
	}

	c.status(500);
	return Promise.resolve(c.json({ status: false, message: err.message }));
}

export { handleGlobalError };
