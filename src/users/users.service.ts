import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async create(createUserDto: Partial<User>): Promise<User> {
		const newUser = this.usersRepository.create(createUserDto);
		return this.usersRepository.save(newUser);
	}

	async findById(id: string): Promise<User | null> {
		return this.usersRepository.findOne({ where: { id } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.usersRepository.findOne({ where: { email } });
	}

	async findAll(): Promise<User[] | null> {
		return this.usersRepository.find();
	}
}
