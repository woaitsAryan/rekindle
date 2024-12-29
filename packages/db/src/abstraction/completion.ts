import type { Prisma } from "@prisma/client";
import type {
	CreateCompletionType,
	UpsertMemoryType,
} from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Completion } from "../types";

export class CompletionDataService {
	private get db() {
		return prisma.completion;
	}

	create(data: CreateCompletionType): Prisma.PrismaPromise<Completion> {
		return this.db.create({
			data: {
				tokens: data.tokens,
				metadata: data.metadata,
				memoryId: data.memoryId,
			},
		});
	}
}
