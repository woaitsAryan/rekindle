import { handleChatCompletion } from "@/controllers/chat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { usageMiddleware } from "@/middleware/usage.middleware";
import { zValidator } from "@/middleware/validator.middleware";
import { ChatBodySchema } from "@rekindle/api-schema/validation";
import type { Context, Hono } from "hono";
import { handleGlobalError } from "./error";

export default function setupRoutes(app: Hono) {
	app.get("/", (c) => c.text("Hello world!"));

	app.use("*", authMiddleware);

	app.use("*", usageMiddleware);

	app.post("/chat", zValidator("json", ChatBodySchema), handleChatCompletion);

	app.notFound((c: Context) => c.json({ message: "Not found", ok: false }, 404));

	app.onError(handleGlobalError)
}