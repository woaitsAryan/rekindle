import { createScopedLogger, LogScope } from "@rekindle/diagnostics";

let loggerInstance: ReturnType<typeof createScopedLogger> | null = null;

export const getLogger = () => {
	if (!loggerInstance) {
		loggerInstance = createScopedLogger(LogScope.Backend);
	}
	return loggerInstance;
};

export const logger = getLogger();
