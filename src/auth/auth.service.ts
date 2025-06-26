import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService {
	private readonly SALT_ROUNDS: number = 10;

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<Omit<User, "password"> | null> {
		const user = await this.usersService.findByEmail(email);
		if (user?.password && (await bcrypt.compare(password, user.password))) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password: _password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: Omit<User, "password">) {
		const payload = { email: user.email, sub: user.id, role: user.role };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(registerUserDto: RegisterUserDto) {
		const existingUser = await this.usersService.findByEmail(registerUserDto.email);
		if (existingUser) throw new ConflictException("User already exists");

		const hashedPassword = await bcrypt.hash(registerUserDto.password, this.SALT_ROUNDS);
		const user = await this.usersService.create({
			...registerUserDto,
			password: hashedPassword,
		});

		const { password: _password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
}
