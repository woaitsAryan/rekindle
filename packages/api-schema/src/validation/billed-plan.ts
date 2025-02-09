import { z } from "zod";

export const BillingPeriodEnum = z.enum([
	"WEEKLY",
	"MONTHLY",
	"YEARLY",
	"INFINITE",
]);
export const BillingPlanTypeEnum = z.enum(["PAID", "FREE"]);

export const CreateBilledPlanDto = z.object({
	name: z.string(),
	type: BillingPlanTypeEnum,
	usageLimit: z.number().int(),
	rateLimit: z.number().int(),
	billingPeriod: BillingPeriodEnum,
});

export const UpsertBilledPlanDto = z.object({
	name: z.string(),
	type: BillingPlanTypeEnum,
	usageLimit: z.number().int(),
	rateLimit: z.number().int(),
	billingPeriod: BillingPeriodEnum,
});

export const GetUniqueBilledPlanDto = z.object({
	type: BillingPlanTypeEnum,
	billingPeriod: BillingPeriodEnum,
});

export type CreateBilledPlanType = z.infer<typeof CreateBilledPlanDto>;
export type UpsertBilledPlanType = z.infer<typeof UpsertBilledPlanDto>;
export type GetUniqueBilledPlanType = z.infer<typeof GetUniqueBilledPlanDto>;
