import { handleChatCompletion } from "@/controllers/chat.controller";
import { getAllMemories, getMemory } from "@/controllers/memory.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { usageMiddleware } from "@/middleware/usage.middleware";
import { zValidator } from "@/middleware/validator.middleware";
import {
	ChatBodySchema,
	PaginationQuery,
} from "@rekindle/api-schema/validation";
import type { Context, Hono } from "hono";
import { handleGlobalError } from "./error";

export default function setupRoutes(app: Hono) {
	app.get("/", (c) => c.text("Hello world!"));

	app.use("*", authMiddleware);

	app.use("*", usageMiddleware);

	app.post("/chat", zValidator("json", ChatBodySchema), handleChatCompletion);

	app.get("/memory", zValidator("query", PaginationQuery), getAllMemories);
	app.get("/memory/:memoryId", getMemory);

	app.notFound((c: Context) =>
		c.json({ message: "Not found", success: false }, 404),
	);

	app.onError(handleGlobalError);
}
