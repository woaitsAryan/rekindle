import type {
	CreateCustomerType,
	FindUniqueCustomerType,
	UpsertCustomerType,
} from "@rekindle/api-schema/validation";
import prisma from "../..";
import type { Customer, FindUniqueCustomerReturn } from "../types";

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
				billedPlanId: data.billedPlanId,
			},
		}) as unknown as Promise<Customer>;
	}

	async upsert(data: UpsertCustomerType): Promise<Customer> {
		return this.db.upsert({
			where: {
				id: data.customerId,
				tombstoned: false,
			},
			create: {
				id: data.customerId,
				email: data.email,
				metadata: data.metadata,
				name: data.name,
				billedPlanId: data.billedPlanId,
			},
			update: {},
		}) as unknown as Promise<Customer>;
	}

	async findUnique<T extends boolean>(
		data: FindUniqueCustomerType,
		include_all: T = false as T,
	): Promise<FindUniqueCustomerReturn<T> | null> {
		return this.db.findUnique({
			where: {
				id: data.customerId,
			},
			include: include_all
				? {
						billedPlan: true,
						billedUsages: true,
						memories: true,
					}
				: undefined,
		}) as Promise<FindUniqueCustomerReturn<T>>;
	}
}
