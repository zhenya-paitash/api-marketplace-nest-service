import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
	@ApiProperty({ example: "user@example.com", description: "User email" })
	@IsEmail()
	email: string;

	@ApiProperty({ example: "password123", description: "User password" })
	@IsString()
	@MinLength(8)
	password: string;

	@ApiProperty({ example: "John Doe", description: "User name" })
	@IsNotEmpty()
	@IsString()
	name: string;
}
