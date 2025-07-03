import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
	@ApiOperation({ summary: "Get all users (Admin only)" })
	findAll() {
		return this.usersService.findAll();
	}
}
