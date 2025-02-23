import { z } from "zod";

export const ChatMessages = z.array(
	z.object({
		content: z.string(),
		role: z.enum(["system", "user", "assistant"]),
	}),
);

export const CompletionMetadata = z.object({
	id: z.string(),
	created: z.number(),
	model: z.string(),
	object: z.enum(["chat.completion.chunk"]),
	usage: z.object({
		completion_tokens: z.number(),
		prompt_tokens: z.number(),
		total_tokens: z.number(),
	}),
});

export const PaginationQuery = z.object({
	page: z.string().default("1").transform(Number).pipe(z.number().int()),
	limit: z.string().default("20").transform(Number).pipe(z.number().int()),
});

export const PaginationQueryWithQuery = PaginationQuery.extend({
	query: z.string(),
});

export type PaginationQueryType = z.infer<typeof PaginationQuery>;
export type PaginationQueryWithQueryType = z.infer<typeof PaginationQueryWithQuery>;
export type CompletionMetadataType = z.infer<typeof CompletionMetadata>;
