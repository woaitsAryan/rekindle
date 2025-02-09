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

	async findAll(data: FindAllMemoryType): Promise<Memory[]> {
		const skip = (data.page - 1) * data.limit;

		return this.db.findMany({
			where: {
				customerId: data.customerId,
				tombstoned: false,
			},
			take: data.limit,
			skip,
		});
	}

	async findOne(data: FindOneMemoryType): Promise<Memory | null> {
		return this.db.findUnique({
			where: {
				customerId: data.customerId,
				id: data.memoryId,
				tombstoned: false,
			},
		});
	}

	async upsert(data: UpsertMemoryType): Promise<Memory> {
		return this.db.upsert({
			where: {
				id: data.id,
				tombstoned: false,
			},
			create: {
				id: data.id,
				customerId: data.customerId,
				messages: data.messages,
			},
			update: {
				messages: data.messages,
			},
		});
	}
}
