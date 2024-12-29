import { z } from 'zod'

export const ChatMessages = z.array(
	z.object({
		content: z.string(),
		role: z.enum(["system", "user", "assistant"]),
	})
)

export const CompletionMetadata = z.object({
	id: z.string(),
	created: z.number(),
	model: z.string(),
	object: z.enum(['chat.completion.chunk']),
	usage: z.object({
		completion_tokens: z.number(),
		prompt_tokens: z.number(),
		total_tokens: z.number(),
	})
})

export type CompletionMetadataType = z.infer<typeof CompletionMetadata>