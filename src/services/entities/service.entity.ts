import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("services")
export class Service {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column("decimal", { precision: 10, scale: 2 })
	price: number;

	@ManyToOne(
		() => User,
		(user) => user.services,
	)
	executor: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
