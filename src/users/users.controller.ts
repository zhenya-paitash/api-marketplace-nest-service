import { Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "./enums/user-role.enum";
import { UsersService } from "./users.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Roles(UserRole.ADMIN)
	@UseGuards(AuthGuard("jwt"), RolesGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "Get all users (Admin only)" })
	findAll() {
		return this.usersService.findAll();
	}

	@Post("me/avatar")
	@UseGuards(AuthGuard("jwt"))
	@UseInterceptors(
		FileInterceptor("file", {
			limits: {
				fileSize: 1024 * 1024 * 5,
			},
			// storage: fileStorage,
		}),
	)
	@ApiBearerAuth()
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				file: {
					type: "string",
					format: "binary",
				},
			},
		},
	})
	@ApiOperation({ summary: "Upload user avatar" })
	uploadAvatar(@GetUser("id") userId: string, @UploadedFile() file: Express.Multer.File) {
		console.log(file);
		return this.usersService.updateAvatar(userId, file.path);
	}
}
