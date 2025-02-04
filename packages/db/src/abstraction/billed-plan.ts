import prisma from "../..";
import type { BilledPlan } from "../types";
import type { CreateBilledPlanType, GetUniqueBilledPlanType, UpsertBilledPlanType } from "@rekindle/api-schema/validation";

export class BilledPlanDataService {
	private get db() {
		return prisma.billedPlan;
	}

	async create(data: CreateBilledPlanType): Promise<BilledPlan> {
		return this.db.create({
			data: {
				name: data.name,
				type: data.type,
				usageLimit: data.usageLimit,
				rateLimit: data.rateLimit,
				billingPeriod: data.billingPeriod
			},
		});
	}

	async findUnique(data: GetUniqueBilledPlanType): Promise<BilledPlan | null> {
		return this.db.findUnique({
			where: {
				type_billingPeriod: {
					type: data.type,
					billingPeriod: data.billingPeriod,
				},
				tombstoned: false
			}
		})
	}

	async upsert(data: UpsertBilledPlanType): Promise<BilledPlan> {
		return this.db.upsert({
			where: {
				type_billingPeriod: {
					type: data.type,
					billingPeriod: data.billingPeriod,
				},
				tombstoned: false
			},
			create: {
				name: data.name,
				type: data.type,
				usageLimit: data.usageLimit,
				rateLimit: data.rateLimit,
				billingPeriod: data.billingPeriod
			},
			update: {
				usageLimit: data.usageLimit,
				rateLimit: data.rateLimit,
				name: data.name
			}
		})
	}
}
