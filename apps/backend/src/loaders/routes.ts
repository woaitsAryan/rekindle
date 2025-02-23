import { handleChatCompletion } from "@/controllers/chat.controller";
import { getAllMemories, getMemory } from "@/controllers/memory.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { usageMiddleware } from "@/middleware/usage.middleware";
import { zValidator } from "@/middleware/validator.middleware";
import { APIRoutes } from "@rekindle/api-schema";
import {
	ChatBodySchema,
	PaginationQuery,
	PaginationQueryWithQuery,
} from "@rekindle/api-schema/validation";
import type { Context, Hono } from "hono";
import { handleGlobalError } from "./error";
import { getFunctionQueueInstance } from "./queue";
// import { getPrismaQueueInstance } from "./db-queue";

export default function setupRoutes(app: Hono) {
	app.get("/", (c) => c.text("Hello world!"));
	app.all("/ping", (c) => c.text("Pong!"));

	app.use("/v1/*", authMiddleware);

	app.post(
		APIRoutes.Chat.Completon,
		zValidator("json", ChatBodySchema),
		usageMiddleware,
		handleChatCompletion,
	);

	app.get(
		APIRoutes.Memory.GetAll,
		zValidator("query", PaginationQueryWithQuery),
		getAllMemories,
	);
	app.get(APIRoutes.Memory.Get, getMemory);

	app.notFound((c: Context) =>
		c.json({ message: "Not found", success: false }, 404),
	);

	app.onError(handleGlobalError);
}
