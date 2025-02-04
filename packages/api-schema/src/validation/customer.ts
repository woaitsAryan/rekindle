import { z } from "zod";

export const CreateCustomerDto = z.object({
	email: z.string(),
	customerId: z.string(),
	metadata: z.record(z.any()),
	name: z.string(),
	billedPlanId: z.string()
})

export const UpsertCustomerDto = z.object({
	email: z.string(),
	customerId: z.string(),
	metadata: z.record(z.any()),
	name: z.string(),
	billedPlanId: z.string()
})

export const FindUniqueCustomerDto = z.object({
	customerId: z.string()
})

export type FindUniqueCustomerType = z.infer<typeof FindUniqueCustomerDto>
export type UpsertCustomerType = z.infer<typeof UpsertCustomerDto>
export type CreateCustomerType = z.infer<typeof CreateCustomerDto>