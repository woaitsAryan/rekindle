import { CONTEXT_VARIABLES } from "@/config/constants";
import { logger } from "@/config/logger";
import { client, openAIConfig } from "@/config/openai";
import { system_prompt } from "@/config/templates";
import { getDBQueueInstance } from "@/helpers/queue";
import type { AuthenticatedEnv, BilledUsageEnv } from "@/types/variable";
import type { APIRoutes } from "@rekindle/api-schema";
import type { CreateGenericJson } from "@rekindle/api-schema/utils";
import type {
	ChatBody,
	CompletionMetadataType,
} from "@rekindle/api-schema/validation";
import { DB } from "@rekindle/db";
import type { Context } from "hono";
import { stream } from "hono/streaming";

export const handleChatCompletion = async (
	c: Context<
		AuthenticatedEnv & BilledUsageEnv,
		APIRoutes.Chat.Completon,
		CreateGenericJson<ChatBody>
	>,
) => {
	const customer = c.get(CONTEXT_VARIABLES.Customer);
	const { messages, id } = c.req.valid("json");

	const memory = await DB.memory.upsert({
		id,
		customerId: customer.id,
		messages,
	});

	const streamingResponse = await client.chat.completions.create({
		messages: [{ role: "system", content: system_prompt }, ...messages],
		...openAIConfig,
	});

	return stream(c, async (stream) => {
		stream.onAbort(() => {
			logger.debug("Client disconnected from chat stream");
		});

		for await (const chunk of streamingResponse) {
			const content = chunk.choices[0]?.delta?.content || "";
			if (content) {
				await stream.write(`0:${JSON.stringify(content)}\n`);
			} else {
				if (chunk.usage) {
					getDBQueueInstance().addJob("completion", "create", {
						data: {
							totalTokens: chunk.usage.total_tokens,
							memoryId: memory.id,
							metadata: chunk as unknown as CompletionMetadataType
						}
					});
				}
			}
		}

		await stream.write(
			`d:${JSON.stringify({
				finishReason: "stop",
			})}\n`,
		);
	});
};
