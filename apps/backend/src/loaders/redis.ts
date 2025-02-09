import { ENV } from "@/config/env";
import { LogScope, createScopedLogger } from "@rekindle/diagnostics";
import { Redis } from "ioredis";

let redisClient: Redis;

async function connectToRedis(): Promise<void> {
	const debug = createScopedLogger(LogScope.Redis);
	if (
		typeof redisClient === "undefined" ||
		!(redisClient instanceof Redis) ||
		redisClient.status !== "ready"
	) {
		const redisUrl = ENV.REDIS_URL as string;
		redisClient = new Redis(redisUrl, {
			maxRetriesPerRequest: null
		});

		redisClient.on("error", (error) => {
			debug.error(`client not connected against ${redisUrl}`, error);
			process.exit(1);
		});

		redisClient.on("connect", () => {
			debug.info(`client connected against ${redisUrl}`);
		});
	}
}

export { connectToRedis, redisClient };
