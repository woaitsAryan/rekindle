import { z } from 'zod';
import { ChatMessages } from './common';

export const UpsertMemoryDto = z.object({
	id: z.string(),
	userId: z.string(),
	messages: ChatMessages
})

export type UpsertMemoryType = z.infer<typeof UpsertMemoryDto>