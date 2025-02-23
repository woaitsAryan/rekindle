import { z } from "zod";
import { ChatBodySchema } from "./chat";
import { PaginationQuery } from "./common";

export const UpsertMemoryDto = ChatBodySchema.extend({
	customerId: z.string(),
});

export const FindAllMemoryDto = PaginationQuery.extend({
	customerId: z.string(),
});

export const FindOneMemoryDto = z.object({
	customerId: z.string().optional(),
	memoryId: z.string(),
});

export const FindByEmotionDto = PaginationQuery.extend({
	customerId: z.string(),
	emotion: z.string(),
});

export type FindOneMemoryType = z.infer<typeof FindOneMemoryDto>;
export type FindAllMemoryType = z.infer<typeof FindAllMemoryDto>;
export type FindByEmotionType = z.infer<typeof FindByEmotionDto>;
export type UpsertMemoryType = z.infer<typeof UpsertMemoryDto>;
export type CreateMemoryType = UpsertMemoryType