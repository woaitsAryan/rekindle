import prisma from '../..'
import type { UpsertMemoryType } from '@rekindle/api-schema/validation'

export class CompletionDataService {
	private get db() {
		return prisma.completion
	}

	async create(data: unknown) {

	}

}