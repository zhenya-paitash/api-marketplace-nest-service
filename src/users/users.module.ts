import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express"; // `@nestjs/platform-fastify` didn't work
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		MulterModule.register({
			dest: "./uploads",
		}),
	],
	providers: [UsersService],
	exports: [
		UsersService, // for Auth module
	],
	controllers: [UsersController],
})
export class UsersModule {}
