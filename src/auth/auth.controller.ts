import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorators/get-user.decorator";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@ApiOperation({ summary: "Register a new user" })
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}

	@Post("login")
	@UseGuards(AuthGuard("local"))
	@ApiOperation({ summary: "Login a user" })
	@ApiBody({ type: LoginUserDto })
	async login(@Request() req: any) {
		// LocalStrategy ran, checked the password and put the user object in req.user
		return this.authService.login(req.user);
	}

	@Get("profile")
	@UseGuards(AuthGuard("jwt"))
	@ApiOperation({ summary: "Get user profile" })
	@ApiBearerAuth()
	getProfile(@GetUser() user: Partial<User>) {
		// JwtStrategy ran, checked the token and put the payload in req.user
		return user;
	}
}
