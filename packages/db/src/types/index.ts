import type * as schema from "@prisma/client";

type CommonFields = {
	updatedAt: Date;
	createdAt: Date;
	tombstoned: boolean;
	tombstonedAt?: Date;
};

export type Memory = schema.Memory;
export type CustomerWithoutMetadata = schema.Customer;
export type Completion = schema.Completion;
export type BilledPlan = schema.BilledPlan;
export type BilledUsage = schema.BilledUsage;

export interface Customer extends Omit<CustomerWithoutMetadata, "metadata"> {
	metadata: {
		name: string;
		email: string;
		picture: string;
		avatar_url: string;
		full_name: string;
	};
}

export interface CustomerWithAllIncludes extends Customer {
	memories: Memory[];
	billedPlan: BilledPlan;
	billedUsages: BilledUsage[];
}

export type FindUniqueCustomerReturn<T extends boolean> = T extends true
	? CustomerWithAllIncludes | null
	: Customer | null;
