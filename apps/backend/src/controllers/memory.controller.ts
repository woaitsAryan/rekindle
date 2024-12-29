import { CONTEXT_VARIABLES } from "@/config/constants";
import type { AuthenticatedEnv } from "@/types/variable";
import type { CreateGenericQuery } from "@rekindle/api-schema/utils";
import type { PaginationQueryType } from "@rekindle/api-schema/validation";
import { DB } from "@rekindle/db";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const getAllMemories = async (
	c: Context<AuthenticatedEnv, "/memory", CreateGenericQuery<PaginationQueryType>>
) => {
	const user = c.get(CONTEXT_VARIABLES.User)
	const { page, limit } = c.req.valid('query')

	const memories = await DB.memory.findAll({ userId: user.id, page, limit })

	return c.json({
		data: memories,
		success: true
	}, 200)
}

export const getMemory = async (
	c: Context<AuthenticatedEnv, "/memory/:memoryId">
) => {
	const user = c.get(CONTEXT_VARIABLES.User)
	const memoryId = c.req.param("memoryId")

	const memory = await DB.memory.findOne({ userId: user.id, memoryId })

	if (!memory) {
		throw new HTTPException(404, { message: "Memory not found" })
	}

	return c.json({
		data: memory,
		success: true
	}, 200)
}