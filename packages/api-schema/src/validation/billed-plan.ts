import { z } from "zod";

export const CreateBilledPlanDto = z.object({
	name: z.string(),
	type: z.enum(["PAID", "FREE"]),
	usageLimit: z.number().int(),
	rateLimit: z.number().int(),
	billingPeriod: z.enum(["WEEKLY", "MONTHLY", "YEARLY", "INFINITE"])
})

export const UpsertBilledPlanDto = z.object({
	name: z.string(),
	type: z.enum(["PAID", "FREE"]),
	usageLimit: z.number().int(),
	rateLimit: z.number().int(),
	billingPeriod: z.enum(["WEEKLY", "MONTHLY", "YEARLY", "INFINITE"])
})

export const GetUniqueBilledPlanDto = z.object({
	type: z.enum(["PAID", "FREE"])
})

export type CreateBilledPlanType = z.infer<typeof CreateBilledPlanDto>
export type UpsertBilledPlanType = z.infer<typeof UpsertBilledPlanDto>
export type GetUniqueBilledPlanType = z.infer<typeof GetUniqueBilledPlanDto>