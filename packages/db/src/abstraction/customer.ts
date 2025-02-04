import type { CreateCustomerType, FindUniqueCustomerType, UpsertCustomerType } from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Customer } from "../types";

export class CustomerDataService {
	private get db() {
		return prisma.customer;
	}

	async create(data: CreateCustomerType): Promise<Customer> {
		return this.db.create({
			data: {
				id: data.customerId,
				email: data.email,
				metadata: data.metadata,
				name: data.name,
				billedPlanId: data.billedPlanId
			}
		})
	}

	async upsert(data: UpsertCustomerType): Promise<Customer> {
		return this.db.upsert({
			where: {
				id: data.customerId,
				tombstoned: false
			},
			create: {
				id: data.customerId,
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
				id: data.customerId
			}
		})
	}
}
