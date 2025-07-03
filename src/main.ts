import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { AppConfig } from "./config/configuration";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true });
	app.useLogger(app.get(Logger));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // auto remove fields that are not in the dto
			transform: true, // auto transform types
		}),
	);

	const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
	const port = configService.get("port", { infer: true });
	const env = configService.get("env", { infer: true });

	const document = SwaggerModule.createDocument(
		app,
		new DocumentBuilder()
			.setTitle("Marketplace API")
			.setDescription("Marketplace API documentation.")
			.setVersion("0.0.9")
			.addTag("API")
			.addBearerAuth()
			.build(),
	);

	SwaggerModule.setup("api/docs", app, document);
	await app.listen(port, "0.0.0.0");

	const logger = app.get(Logger);
	logger.log(`🚀 Server started on port: ${port} in ${env} mode.`);
	logger.log(`📄 Swagger documentation is available here http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
	console.error("Application bootstrap failed:", error);
	process.exit(1);
});
