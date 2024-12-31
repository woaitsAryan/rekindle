import type { User } from "@supabase/supabase-js";
import type { Env } from "hono";

export interface AuthenticatedEnv extends Env {
	Variables: {
		customer: User;
	};
}
