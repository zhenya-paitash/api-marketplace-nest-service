import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configuration } from "./config/configuration";
import { typeOrmConfig } from "./config/typeorm.config";
import { validationSchema } from "./config/validation.schema";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env.local",
			load: [configuration],
			validationSchema,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: typeOrmConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
