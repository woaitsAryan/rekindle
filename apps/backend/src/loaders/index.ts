import { getDBQueueInstance } from "@/helpers/queue";
import type { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import setupRoutes from "./routes";

export default function loadServer(app: Hono) {
	app.use(logger());
	app.use(cors());

	getDBQueueInstance();

	setupRoutes(app);
}
