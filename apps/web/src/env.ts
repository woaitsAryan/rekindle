import { z } from "zod";

export const env = z
	.object(
		Object.fromEntries(
			Object.keys(process.env).map((key) => [key, z.string()])
		)
	)
	.parse(process.env);