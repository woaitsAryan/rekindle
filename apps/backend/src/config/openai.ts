import OpenAI from 'openai'
import { ENV } from './env'
import type { ChatCompletionCreateParamsStreaming } from 'openai/resources/index.mjs'

export const client = new OpenAI({
	apiKey: ENV.OPENAI_API_KEY
})

export const openAIConfig = {
	model: 'gpt-4o-mini',
	stream: true,
	stream_options: {
		include_usage: true
	}
} satisfies Omit<ChatCompletionCreateParamsStreaming, 'messages'>

