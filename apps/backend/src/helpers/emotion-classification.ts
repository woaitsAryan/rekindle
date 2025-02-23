import { client, emotionClassificationOpenAIConfig } from "@/config/openai";
import { EmotionsEnum } from "@rekindle/api-schema/validation";
import { DB } from "@rekindle/db";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const system_prompt = `
You are an AI assistant that analyzes a person's description of their day and classifies the underlying emotions.
When given an input text, output an array of exactly three strings representing the emotions in order of likelihood:
the first string is the most likely emotion, the second is the next likely, and the third is the least likely.
Please ensure that only an array is returned.
`;


export async function classifyEmotion(text: string, memoryId: string) {
	const response = await client.chat.completions.create({
		...emotionClassificationOpenAIConfig,
		messages: [{ role: "system", content: system_prompt }, { role: "user", content: text }],
		response_format: zodResponseFormat(EmotionsEnum, "emotions")
	});

	if (!response.choices[0]) {
		throw new Error("No result from OpenAI");
	}

	const result = response.choices[0].message.content;

	if (!result) {
		throw new Error("No result from OpenAI");
	}

	const data = JSON.parse(result);

	// console.log(emotions);
	await DB.memory.addEmotions(memoryId, data.emotions);
}
