import { logger } from "@/config/logger";
import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export const zValidator = (
	target: keyof ValidationTargets,
	schema: ZodSchema,
) =>
	zv(target, schema, (result, c) => {
		if (!result.success) {
			const formattedError = fromZodError(result.error, {
				maxIssuesInMessage: 1,
				prefix: null,
				includePath: true,
			});
			throw new HTTPException(400, { message: formattedError.toString() });
		}
	});
