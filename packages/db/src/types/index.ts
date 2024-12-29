import type * as schema from '@prisma/client';

type CommonFields = {
	updatedAt: Date;
	createdAt: Date;
	tombstoned: boolean;
	tombstonedAt?: Date;
}

export type Memory = schema.Memory
export type User = schema.User
export type Completion = schema.Completion
