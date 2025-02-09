import type {
	CreateCompletionType,
} from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Completion } from "../types";

export class CompletionDataService {
	private get db() {
		return prisma.completion;
	}

	async create(data: CreateCompletionType): Promise<Completion> {
		return this.db.create({
			data: {
				totalTokens: data.tokens,
				metadata: data.metadata,
				memoryId: data.memoryId,
			},
		});
	}
}
