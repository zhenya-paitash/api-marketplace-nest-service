import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";

@Entity("orders")
export class Order {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
	status: OrderStatus;

	@ManyToOne(
		() => User,
		(user) => user.orders,
	)
	customer: User;

	@ManyToOne(() => Service)
	service: Service;

	@CreateDateColumn()
	createdAt: Date;
}
