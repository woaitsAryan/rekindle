import type { UpsertMemoryType } from '@rekindle/api-schema/validation'
import prisma from '../..'
import type { Memory } from '../types'
import type { Prisma } from '@prisma/client'

export class MemoryDataService {
	private get db() {
		return prisma.memory
	}

	upsert(data: UpsertMemoryType): Prisma.PrismaPromise<Memory> {
		return this.db.upsert({
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