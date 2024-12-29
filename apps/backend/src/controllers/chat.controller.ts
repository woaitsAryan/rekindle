import { CONTEXT_VARIABLES } from "@/config/constants";
import { logger } from "@/config/logger";
import { client, openAIConfig } from "@/config/openai";
import { system_prompt } from "@/config/templates";
import type { AuthenticatedEnv } from "@/types/variable";
import type { Context } from "hono";
import { stream } from 'hono/streaming'
import { DB } from '@rekindle/db'
import { dbQueue } from "@/helpers/queue";
import type { CreateGenericJson } from "@rekindle/api-schema/utils";
import type { ChatBody, CompletionMetadataType } from "@rekindle/api-schema/validation";

export const handleChatCompletion = async (
	c: Context<AuthenticatedEnv, "/chat", CreateGenericJson<ChatBody>>,
) => {
	const user = c.get(CONTEXT_VARIABLES.User);
	const { messages, id } = c.req.valid("json");

	const memory = await DB.memory.upsert({
		id,
		userId: user.id,
		messages
	})

	const streamingResponse = await client.chat.completions.create({
		messages: [
			{ 'role': 'system', 'content': system_prompt },
			...messages
		],
		...openAIConfig
	})

	return stream(c, async (stream) => {
		stream.onAbort(() => {
			logger.debug('Client disconnected from chat stream');
		});

		for await (const chunk of streamingResponse) {
			const content = chunk.choices[0]?.delta?.content || '';
			if (content) {
				await stream.write(`0:${JSON.stringify(content)}\n`);
			} else {
				if (chunk.usage) {
					const completion = DB.completion.create({
						tokens: chunk.usage.total_tokens,
						memoryId: memory.id,
						metadata: chunk as unknown as CompletionMetadataType
					})
					dbQueue.addQuery(completion)
				}
			}
		}

		await stream.write(`d:${JSON.stringify({
			finishReason: "stop"
		})}\n`);
	});
};
