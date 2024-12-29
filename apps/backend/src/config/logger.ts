import { createScopedLogger } from "@rekindle/diagnostics";

let loggerInstance: ReturnType<typeof createScopedLogger> | null = null;

export const getLogger = () => {
	if (!loggerInstance) {
		loggerInstance = createScopedLogger("backend");
	}
	return loggerInstance;
};

export const logger = getLogger();