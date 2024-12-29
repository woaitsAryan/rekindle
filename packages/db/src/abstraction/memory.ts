import type { Prisma } from "@prisma/client";
import type {
	FindAllMemoryType,
	FindOneMemoryType,
	UpsertMemoryType,
} from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Memory } from "../types";

export class MemoryDataService {
	private get db() {
		return prisma.memory;
	}

	findAll(data: FindAllMemoryType): Prisma.PrismaPromise<Memory[]> {
		const skip = (data.page - 1) * data.limit;

		return this.db.findMany({
			where: {
				userId: data.userId,
			},
			take: data.limit,
			skip,
		});
	}

	findOne(data: FindOneMemoryType): Prisma.PrismaPromise<Memory | null> {
		return this.db.findUnique({
			where: {
				userId: data.userId,
				id: data.memoryId,
			},
		});
	}

	upsert(data: UpsertMemoryType): Prisma.PrismaPromise<Memory> {
		return this.db.upsert({
			where: {
				id: data.id,
			},
			create: {
				id: data.id,
				userId: data.userId,
				content: data.messages[0]?.content ?? "",
				messages: data.messages,
			},
			update: {
				messages: data.messages,
			},
		});
	}
}
