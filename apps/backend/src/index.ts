import { ENV, init_env } from "@/config/env";
import { Hono } from "hono";
import loadServer from "./loaders";
import { logger } from "./config/logger";

init_env();

const app = new Hono();

loadServer(app);

logger.info(`Started server on port ${ENV.BACKEND_PORT}!`)

export default {
	port: ENV.BACKEND_PORT,
	fetch: app.fetch,
};
