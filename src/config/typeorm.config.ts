import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppConfig } from "./configuration";

export const typeOrmConfig = (configService: ConfigService<AppConfig, true>): TypeOrmModuleOptions => {
	const dbConfig = configService.get("database", { infer: true });
	const synchronize: boolean = configService.get("env") === "development";

	return {
		type: "postgres",
		host: dbConfig.host,
		port: dbConfig.port,
		username: dbConfig.username,
		password: dbConfig.password,
		database: dbConfig.database,
		entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
		synchronize,
	};
};
