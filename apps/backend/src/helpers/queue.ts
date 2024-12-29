import prisma from '@rekindle/db';
import { createScopedLogger } from '@rekindle/diagnostics';
import type { Prisma } from '@prisma/client';

export class DatabaseQueryQueue {
	private queries: Array<Prisma.PrismaPromise<any>>;
	private logger = createScopedLogger("dbQueue");

	constructor() {
		this.queries = [];
	}

	public addQuery(query: Prisma.PrismaPromise<any>) {
		this.queries.push(query);
		if (this.queries.length > 10) {
			this.flushQueries()
		}
	}

	private async flushQueries() {
		if (this.queries.length > 0) {
			const transaction = prisma.$transaction(this.queries);
			try {
				await transaction;
				this.logger.info(`Flushed ${this.queries.length} queries`);
			} catch (error) {
				this.logger.error('Transaction failed: ', error);
			}
			this.queries = [];
		}
	}

	public start() {
		setInterval(() => this.flushQueries(), 5000);
	}
}

let DatabaseQueueInstance: DatabaseQueryQueue | null = null

export const getDBQueueInstance = (): DatabaseQueryQueue => {
	if (!DatabaseQueueInstance) {
		DatabaseQueueInstance = new DatabaseQueryQueue();
		DatabaseQueueInstance.start();
	}
	return DatabaseQueueInstance;
}

export const dbQueue = getDBQueueInstance()
