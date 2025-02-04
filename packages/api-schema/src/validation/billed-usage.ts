import { z } from "zod";

export const CreateBilledUsageDto = z.object({
	customerId: z.string(),
	periodStart: z.date(),
	periodEnd: z.date().optional()
})

export const FindManyBilledUsageDto = z.object({
	customerId: z.string()
})

export const QueueUpdateBilledUsageDto = z.object({
	billedUsageId: z.string(),
	increaseBy: z.number().int(),
})

export type CreateBilledUsageType = z.infer<typeof CreateBilledUsageDto>
export type FindManyBilledUsageType = z.infer<typeof FindManyBilledUsageDto>
export type QueueUpdateBilledUsageType = z.infer<typeof QueueUpdateBilledUsageDto>