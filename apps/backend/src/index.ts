import { ENV, init_env } from "@/config/env";
import { handleChatCompletion } from "@/controllers/chat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { usageMiddleware } from "@/middleware/usage.middleware";
import { zValidator } from "@/middleware/validator.middleware";
import { ChatBodySchema } from "@rekindle/api-schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

init_env();

const app = new Hono();

app.use(logger());

app.use(cors());

app.get("/", (c) => c.text("Hello world!"));

app.use("*", authMiddleware);

app.use("*", usageMiddleware);

app.post("/chat", zValidator("json", ChatBodySchema), handleChatCompletion);

export default {
	port: ENV.PORT,
	fetch: app.fetch,
};
