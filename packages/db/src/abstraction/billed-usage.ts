import { Prisma } from "@prisma/client";
import prisma from "../..";
import type { BilledUsage } from "../types";
import type { CreateBilledUsageType, FindManyBilledUsageType, QueueUpdateBilledUsageDto, QueueUpdateBilledUsageType } from "@rekindle/api-schema/validation";

export class BilledUsageDataService {
	private get db() {
		return prisma.billedUsage;
	}

	async create(data: CreateBilledUsageType): Promise<BilledUsage> {
		return this.db.create({
			data: {
				customerId: data.customerId,
				periodStart: data.periodStart,
				periodEnd: data.periodEnd
			},
		});
	}

	async findMany(data: FindManyBilledUsageType): Promise<BilledUsage[] | null>{
		return this.db.findMany({
			where: {
				customerId: data.customerId
			}
		})
	}

	queueUpdate(data: QueueUpdateBilledUsageType): Prisma.PrismaPromise<BilledUsage> {
		return this.db.update({
			where: {
				id: data.billedUsageId
			},
			data: {
				rawAmount: {
					increment: data.increaseBy
				}
			}
		})
	} 

}
