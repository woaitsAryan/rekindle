import { CONTEXT_VARIABLES } from "@/config/constants";
import type { BilledPlan, BilledUsage } from "@rekindle/db/types";
import type { User } from "@supabase/supabase-js";
import type { Env } from "hono";

export interface AuthenticatedEnv extends Env {
	Variables: {
		[CONTEXT_VARIABLES.Customer]: User;
	};
}

export interface BilledUsageEnv extends Env {
	Variables: {
		[CONTEXT_VARIABLES.BilledUsage]: BilledUsage;
		[CONTEXT_VARIABLES.BilledPlan]: BilledPlan
	}
} 