import { redisClient } from "@/loaders/redis";
import prisma, { type PrismaClient } from "@rekindle/db";
import { createScopedLogger, LogScope } from "@rekindle/diagnostics";
import { Queue, Worker } from "bullmq";

const QUEUE_NAME = "dbOperations";

const dbOperationsQueue = new Queue(QUEUE_NAME, {
	connection: redisClient,
});

type OperationArgs<
	M extends keyof PrismaClient,
	O extends keyof PrismaClient[M]
> = Parameters<Extract<PrismaClient[M][O], (...args: any) => any>>;

type OperationArg<
	M extends keyof PrismaClient,
	O extends keyof PrismaClient[M]
> = OperationArgs<M, O> extends [infer P] ? P : never;

export class DatabaseQueryQueue {
	private readonly logger = createScopedLogger(LogScope.DatabaseQueryQueue);
	private worker?: Worker;

	constructor() {
		this.logger.info("Creating DatabaseQueryQueue instance");
	}

	public async addJob<
		M extends keyof PrismaClient,
		O extends keyof PrismaClient[M]
	>(
		model: M,
		operation: O,
		data: OperationArg<M, O>
	) {
		try {
			await dbOperationsQueue.add(
				operation as string,
				{
					model,
					operation,
					data,
				},
				{
					attempts: 1,
					backoff: { type: "exponential", delay: 1000 },
				},
			);
			this.logger.info(
				`Job added to queue: ${String(model)}.${String(operation)}`,
			);
		} catch (error) {
			this.logger.error(
				`Failed to add job to queue: ${String(model)}.${String(operation)}`,
				error,
			);
		}
	}

	public start() {
		this.worker = new Worker(
			QUEUE_NAME,
			async (job) => {
				const { model, operation, data } = job.data;
				this.logger.info(`Processing job: ${model}.${String(operation)}`);
				try {
					// @ts-expect-error
					await prisma[model][operation](data);
					this.logger.info(`Job completed: ${model}.${String(operation)}`);
				} catch (error) {
					this.logger.error(`Job failed: ${model}.${String(operation)}`, error);
					throw error;
				}
			},
			{ connection: redisClient, concurrency: 2, lockDuration: 30000 },
		);

		this.worker.on("failed", (job, err) => {
			this.logger.error(`Job ${job?.id} failed`, err);
		});
	}

	public async shutdown() {
		if (this.worker) {
			await this.worker.close();
			this.logger.info("Worker shut down");
		}
	}
}

let DatabaseQueueInstance: DatabaseQueryQueue | null = null;

export const getDBQueueInstance = (): DatabaseQueryQueue => {
	if (!DatabaseQueueInstance) {
		DatabaseQueueInstance = new DatabaseQueryQueue();
		DatabaseQueueInstance.start();
	}
	return DatabaseQueueInstance;
};

// export const dbQueue = getDBQueueInstance();
