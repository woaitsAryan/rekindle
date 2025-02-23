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

	return logger
}
