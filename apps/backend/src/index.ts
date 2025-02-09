import { ENV, init_env } from "@/config/env";
import { Hono } from "hono";
import { logger } from "./config/logger";
import loadServer from "./loaders";
import { getDBQueueInstance } from "./helpers/queue";
import { redisClient } from "./loaders/redis";

init_env();

const app = new Hono();

loadServer(app);

const handleShutdown = () => {
	logger.info('Received shutdown signal. Starting graceful shutdown...');
	getDBQueueInstance().shutdown()
	redisClient.quit()
	process.exit(0);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

logger.info(`Started server on port ${ENV.BACKEND_PORT}!`);

export default {
	port: ENV.BACKEND_PORT,
	fetch: app.fetch,
};
