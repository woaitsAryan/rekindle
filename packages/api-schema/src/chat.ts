import { z } from "zod";

export const ChatBodySchema = z.object({
	messages: z.array(
		z.object({
			content: z.string(),
			role: z.enum(["system", "user", "assistant"]),
		}),
	),
});



export type ChatBody = z.infer<typeof ChatBodySchema>;
