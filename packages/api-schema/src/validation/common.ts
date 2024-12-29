import { z } from 'zod'

export const ChatMessages = z.array(
	z.object({
		content: z.string(),
		role: z.enum(["system", "user", "assistant"]),
	})
)