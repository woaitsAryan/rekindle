import { CONTEXT_VARIABLES } from "@/config/constants";
import { logger } from "@/config/logger";
import { getMatchingBilledUsage } from "@/helpers/billed-usage";
import type { AuthenticatedEnv, BilledUsageEnv } from "@/types/variable";
import { DB } from "@rekindle/db";
import type { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const usageMiddleware = createMiddleware(async (c: Context<AuthenticatedEnv & BilledUsageEnv>, next) => {
	const user = c.get(CONTEXT_VARIABLES.Customer);

	const billedPlan = await prisma.customer.findUnique({
		where: {
			id: user.id
		},
		select: {
			billedPlan: true
		}
	})

	if (!billedPlan) {
		logger.error("Billed plan not found for the customer", user.id)
		throw new HTTPException(404, { "message": "Billed plan not found for the customer" })
	}

	const billedUsages = await DB.billedUsage.findMany({ customerId: user.id })
	if (!billedUsages) {
		logger.error("Billed usages not found for customer", user.id)
		throw new HTTPException(404, { message: "Billed usages not found" })
	}

	const matchedBilledUsage = getMatchingBilledUsage(billedUsages)

	if (!matchedBilledUsage) {
		logger.error("Unable to find a matching billed usage rule for customer", user.id)
		throw new HTTPException(404, { message: "No matching billed usage found" })
	}

	if (matchedBilledUsage.rawAmount > billedPlan.billedPlan.usageLimit){
		throw new HTTPException(429, { message: "Usage limit exhausted" })
	}

	c.set(CONTEXT_VARIABLES.BilledUsage, matchedBilledUsage)
	c.set(CONTEXT_VARIABLES.BilledPlan, billedPlan.billedPlan)

	await next();

	// TODO: Update user's usage
});
