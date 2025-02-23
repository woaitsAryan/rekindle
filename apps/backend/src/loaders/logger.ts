import { createScopedLogger, LogScope } from "@rekindle/diagnostics";

let loggerSingleton: ReturnType<typeof createScopedLogger> | null = null;

export const getLogger = () => {
	if (!loggerSingleton) {
		loggerSingleton = createScopedLogger(LogScope.Backend);
	}
	return loggerSingleton;
};

export const logger = getLogger();