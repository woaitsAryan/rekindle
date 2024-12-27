import { CONTEXT_VARIABLES } from "@/config/constants";
import { system_prompt } from "@/config/templates";
import type { AuthenticatedEnv } from "@/types/variable";
import { openai } from "@ai-sdk/openai";
import type { ChatBody, CreateGenericBody } from "@rekindle/api-schema";
import { streamText } from "ai";
import type { Context, Env } from "hono";

export const handleChatCompletion = async (
	c: Context<AuthenticatedEnv, string, CreateGenericBody<ChatBody>>,
) => {
	const user = c.get(CONTEXT_VARIABLES.User);
	const input_messages = c.req.valid("json").messages;

	const result = streamText({
		model: openai('gpt-4o-mini'),
		messages: input_messages,
		system: system_prompt,
	});

	return result.toDataStreamResponse();
};
