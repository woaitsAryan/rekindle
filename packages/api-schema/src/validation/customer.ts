import { z } from "zod";

export const UpsertCustomerDto = z.object({
	email: z.string(),
	userId: z.string(),
	metadata: z.record(z.any()),
	name: z.string(),
	billedPlanId: z.string()
})

export const FindUniqueCustomerDto = z.object({
	userId: z.string()
})

export type FindUniqueCustomerType = z.infer<typeof FindUniqueCustomerDto>
export type UpsertCustomerType = z.infer<typeof UpsertCustomerDto>