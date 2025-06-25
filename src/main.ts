import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { AppConfig } from "./config/configuration";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule);

	const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
	const port = configService.get("port", { infer: true });

	await app.listen(port);
	console.log(`🚀 Server started on port: ${port}`);
}
bootstrap();
