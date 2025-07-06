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

	async findByEmail(email: string, withPassword = false): Promise<User | null> {
		const queryBuilder = this.usersRepository.createQueryBuilder('user')
			.where('user.email = :email', { email });

		if (withPassword) {
			queryBuilder.addSelect('user.password');
		}

		return queryBuilder.getOne();
	}

	async findAll(): Promise<User[] | null> {
		return this.usersRepository.find();
	}

	async updateAvatar(userId: string, avatarUrl: string): Promise<boolean> {
		try {
			const staticAvatarUrl = `/static/${avatarUrl}`;
			await this.usersRepository.update(userId, { avatarUrl: staticAvatarUrl });
		} catch (error) {
			console.error(error);
			return false;
		}

		return true;
	}
}
