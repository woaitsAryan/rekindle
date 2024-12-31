import type * as schema from "@prisma/client";

type CommonFields = {
	updatedAt: Date;
	createdAt: Date;
	tombstoned: boolean;
	tombstonedAt?: Date;
};

export type Memory = schema.Memory;
export type Customer = schema.Customer;
export type Completion = schema.Completion;
export type BilledPlan = schema.BilledPlan;
export type BilledUsage = schema.BilledUsage;
