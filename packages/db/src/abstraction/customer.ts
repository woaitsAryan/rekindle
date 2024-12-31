import type { FindUniqueCustomerType, UpsertCustomerType } from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Customer } from "../types";

export class CustomerDataService {
	private get db() {
		return prisma.customer;
	}

	async upsert(data: UpsertCustomerType): Promise<Customer> {
		return this.db.upsert({
			where: {
				email: data.email,
				tombstoned: false
			},
			create: {
				id: data.userId,
				email: data.email,
				metadata: data.metadata,
				name: data.name,
				billedPlanId: data.billedPlanId
			},
			update: {}
		})
	}

	async findUnique(data: FindUniqueCustomerType): Promise<Customer | null> {
		return this.db.findUnique({
			where: {
				id: data.userId
			}
		})
	}
}
