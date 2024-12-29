import { z } from "zod";
import { ChatBodySchema } from "./chat";
import { PaginationQuery } from "./common";

export const UpsertMemoryDto = ChatBodySchema.extend({
	userId: z.string(),
});

export const FindAllMemoryDto = PaginationQuery.extend({
	userId: z.string(),
});

export const FindOneMemoryDto = z.object({
	userId: z.string(),
	memoryId: z.string(),
});

export type FindOneMemoryType = z.infer<typeof FindOneMemoryDto>;
export type FindAllMemoryType = z.infer<typeof FindAllMemoryDto>;
export type UpsertMemoryType = z.infer<typeof UpsertMemoryDto>;
