import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AppConfig } from "./config/configuration";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
	const port = configService.get("port", { infer: true });
	const env = configService.get("env", { infer: true });

	const document = SwaggerModule.createDocument(
		app,
		new DocumentBuilder()
			.setTitle("Marketplace API")
			.setDescription("Marketplace API documentation.")
			.setVersion("0.0.3")
			.addTag("API")
			.addBearerAuth()
			.build(),
	);

	SwaggerModule.setup("api/docs", app, document);
	await app.listen(port, "0.0.0.0");

	console.log(`🚀 Server started on port: ${port} in ${env} mode.`);
	console.log(`📄 Swagger documentation is available here http://localhost:${port}/api/docs`);
}
bootstrap();
