import { handleChatCompletion } from "@/controllers/chat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { usageMiddleware } from "@/middleware/usage.middleware";
import { zValidator } from "@/middleware/validator.middleware";
import { ChatBodySchema } from "@rekindle/api-schema";
import type { Hono } from "hono";

export default function setupRoutes(app: Hono){
	app.get("/", (c) => c.text("Hello world!"));

	app.use("*", authMiddleware);

	app.use("*", usageMiddleware);

	app.post("/chat", zValidator("json", ChatBodySchema), handleChatCompletion);
}