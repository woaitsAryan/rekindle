import { createLogger, format, transports } from "winston";

export type LogLevel = "error" | "warn" | "info" | "debug" | "trace";

export function createScopedLogger(scope: string, level: LogLevel = "debug") {
	const logger = createLogger({
		level,
		format: format.combine(
			format.errors({ stack: true }),
			format.colorize(),
			format.printf(({ level, message }) => {
				const formattedMessage =
					typeof message === "object"
						? JSON.stringify(message, null, 2)
						: message;

				return `${level} [${scope}]: ${formattedMessage}`;
			}),
		),
		transports: [new transports.Console()],
	});

	return {
		error: (message: any, ...args: any[]) => logger.error(message, ...args),
		warn: (message: any, ...args: any[]) => logger.warn(message, ...args),
		info: (message: any, ...args: any[]) => logger.info(message, ...args),
		debug: (message: any, ...args: any[]) => logger.debug(message, ...args),
	};
}
