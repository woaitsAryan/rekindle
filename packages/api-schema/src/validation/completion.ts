import { z } from 'zod'
import { CompletionMetadata } from './common'

export const CreateCompletionDto = z.object({
	tokens: z.number(),
	metadata: CompletionMetadata,
	memoryId: z.string()
})

export type CreateCompletionType = z.infer<typeof CreateCompletionDto>

export function validateCreateCompletion(data: unknown){
	return CreateCompletionDto.parse(data)
}