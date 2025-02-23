// import { getPrismaQueueInstance } from "@/loaders/db-queue";
import type { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { connectToRedis, redisClient } from "./redis";
import setupRoutes from "./routes";
import { getFunctionQueueInstance } from "./queue";
import { createScopedLogger, LogScope } from "@rekindle/diagnostics";
// import { AsyncPrismaQueue } from "async-prisma-queue";

export default function loadServer(app: Hono) {
	app.use(logger());
	app.use(cors());

	connectToRedis().then(() => {
		const logger = createScopedLogger(LogScope.DatabaseQueryQueue)
		// new AsyncPrismaQueue(prisma, redisClient, { logger });
		// getPrismaQueueInstance();
		getFunctionQueueInstance()
	});

	setupRoutes(app);
}
