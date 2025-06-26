import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configuration } from "./config/configuration";
import { loggerConfig } from "./config/logger.config";
import { typeOrmConfig } from "./config/typeorm.config";
import { validationSchema } from "./config/validation.schema";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
			load: [configuration],
			validationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: typeOrmConfig,
		}),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: loggerConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
