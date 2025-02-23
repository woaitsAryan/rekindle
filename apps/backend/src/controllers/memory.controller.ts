import { CONTEXT_VARIABLES } from "@/config/constants";
import type { AuthenticatedEnv } from "@/types/variable";
import type { APIRoutes } from "@rekindle/api-schema";
import type { CreateGenericQuery } from "@rekindle/api-schema/utils";
import { EmotionsArray, type PaginationQueryWithQueryType } from "@rekindle/api-schema/validation";
import { DB } from "@rekindle/db";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import createFuzzySearch from '@nozbe/microfuzz'

function findMatchingEmotion(query: string, emotions: string[]): string | null {
	const normalizedQuery = query.toLowerCase().trim();

	return emotions.find(emotion =>
		normalizedQuery.includes(emotion.toLowerCase())
	) || null;
}

export const getAllMemories = async (
	c: Context<
		AuthenticatedEnv,
		APIRoutes.Memory.GetAll,
		CreateGenericQuery<PaginationQueryWithQueryType>
	>,
) => {
	const customer = c.get(CONTEXT_VARIABLES.Customer);
	const { page, limit, query } = c.req.valid("query");

	const matchingEmotion = findMatchingEmotion(query, new Array(...EmotionsArray));

	if (!matchingEmotion) {
		throw new HTTPException(400, { message: "No valid emotion found in query" });
	}

	const memories = await DB.memory.findByEmotion({
		customerId: customer.id,
		page,
		limit,
		emotion: matchingEmotion,
	});

	return c.json(
		{
			data: memories,
			success: true,
		},
		200,
	);
};

export const getMemory = async (
	c: Context<AuthenticatedEnv, APIRoutes.Memory.Get>,
) => {
	const customer = c.get(CONTEXT_VARIABLES.Customer);
	const memoryId = c.req.param("memoryId");

	const memory = await DB.memory.findOne({ customerId: customer.id, memoryId });

	if (!memory) {
		throw new HTTPException(404, { message: "Memory not found" });
	}

	return c.json(
		{
			data: memory,
			success: true,
		},
		200,
	);
};
