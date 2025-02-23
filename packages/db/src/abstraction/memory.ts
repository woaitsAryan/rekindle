import type { Prisma } from "@prisma/client";
import type {
	CreateMemoryType,
	FindAllMemoryType,
	FindByEmotionType,
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

	async findByEmotion(data: FindByEmotionType): Promise<Memory[]> {
		const skip = (data.page - 1) * data.limit;

		return this.db.findMany({
			where: {
				customerId: data.customerId,
				tombstoned: false,
				emotions: {
					has: data.emotion,
				},
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

	async addEmotions(memoryId: string, emotions: string[]) {
		return this.db.update({
			where: {
				id: memoryId,
				tombstoned: false,
			},
			data: { emotions },
		});
	}

	async create(data: CreateMemoryType): Promise<Memory> {
		return this.db.create({
			data: {
				id: data.id,
				customerId: data.customerId,
				messages: data.messages
			}
		})
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
