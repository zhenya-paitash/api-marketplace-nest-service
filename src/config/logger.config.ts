import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./configuration";

export const loggerConfig = (configService: ConfigService<AppConfig, true>) => {
	const isProduction = configService.get("env") === "production";
	return {
		pinoHttp: {
			// transport: isProduction ? undefined : { target: "pino-pretty" },
			transport: { target: "pino-pretty" },
			level: isProduction ? "info" : "debug",
		},
	};
};
