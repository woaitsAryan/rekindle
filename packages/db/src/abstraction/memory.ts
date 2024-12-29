import type { UpsertMemoryType } from '@rekindle/api-schema/validation'
import prisma from '../..'
import type { Memory } from '../types'

export class MemoryDataService {
	private get db() {
		return prisma.memory
	}

	async create(data: unknown) {

	}
	
	async upsert(data: UpsertMemoryType): Promise<Memory> {
		return await this.db.upsert({
			where: {
				id: data.id
			},
			create: {
				id: data.id,
				userId: data.userId,
				content: data.messages[0]?.content ?? '',
				messages: data.messages
			},
			update: {
				messages: data.messages
			}
		})
	}
}