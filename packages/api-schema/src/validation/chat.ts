import { z } from "zod";
import { ChatMessages } from "./common";

export const ChatBodySchema = z.object({
	messages: ChatMessages,
	id: z.string(),
});

export type ChatBody = z.infer<typeof ChatBodySchema>;
