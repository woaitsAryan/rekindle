import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ZodSchema } from "zod";

export const zValidator = (
	target: keyof ValidationTargets,
	schema: ZodSchema,
) =>
	zv(target, schema, (result, c) => {
		if (!result.success) {
			throw new HTTPException(400, { cause: result.error });
		}
	});
