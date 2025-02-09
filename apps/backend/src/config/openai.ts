import OpenAI from "openai";
import type {
	ChatCompletionCreateParams,
	ChatCompletionCreateParamsStreaming,
} from "openai/resources/index.mjs";
import { ENV } from "./env";

export const client = new OpenAI({
	apiKey: ENV.OPENAI_API_KEY,
});

export const openAIConfig = {
	model: "gpt-4o-mini",
	stream: true,
	stream_options: {
		include_usage: true,
	},
} satisfies Omit<ChatCompletionCreateParamsStreaming, "messages">;

export const emotionClassificationOpenAIConfig = {
	model: "gpt-4o-mini",
	stream: false,
} satisfies Omit<ChatCompletionCreateParams, "messages">;
