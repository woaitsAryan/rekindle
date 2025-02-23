import { classifyEmotion } from "@/helpers/emotion-classification";
import { redisClient } from "@/loaders/redis";
import { createScopedLogger, LogScope } from "@rekindle/diagnostics";
import { AsyncOperationQueue, type WorkerOptions, type JobsOptions } from "async-operation-queue";

const functionRegistry = {
	classifyEmotion,
}

type FunctionRegistryType = typeof functionRegistry

const workerOptions: WorkerOptions = { concurrency: 2, lockDuration: 30000 }

const jobOptions: JobsOptions = { attempts: 1, backoff: { type: "exponential", delay: 1000 } }

let FunctionQueueSingleton: AsyncOperationQueue<FunctionRegistryType> | null = null;

export const getFunctionQueueInstance = (): AsyncOperationQueue<FunctionRegistryType> => {
	if (!FunctionQueueSingleton) {
		const logger = createScopedLogger(LogScope.FunctionQueue)
		FunctionQueueSingleton = new AsyncOperationQueue(functionRegistry, redisClient, { logger, workerOptions, jobOptions, });
	}
	return FunctionQueueSingleton;
};