import { createScopedLogger } from '@rekindle/diagnostics'

const globalForLogger = global as unknown as {
	logger: ReturnType<typeof createScopedLogger> | undefined;
};

export const logger = globalForLogger.logger ?? createScopedLogger('web');

if (process.env.NODE_ENV !== 'production') {
	globalForLogger.logger = logger;
}