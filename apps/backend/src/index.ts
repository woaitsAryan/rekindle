import { ENV, init_env } from "@/config/env";
import { Hono } from "hono";
import loadServer from "./loaders";

init_env();

const app = new Hono();

loadServer(app);

export default {
	port: ENV.PORT,
	fetch: app.fetch,
};
