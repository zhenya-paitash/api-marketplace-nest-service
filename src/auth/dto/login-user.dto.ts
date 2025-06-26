import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
	@ApiProperty({ example: "user@example.com", description: "User email" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "password123", description: "User password" })
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string;
}
