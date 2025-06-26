import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Index({ unique: true }) // index and unique for fast search
	@Column({ type: "varchar", length: 255 })
	email: string;

	@Column({ type: "varchar", length: 255, select: false })
	password?: string; // can be null for OAuth users

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "varchar", nullable: true })
	avatartUrl?: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
	role: UserRole;

	@Column({ type: "varchar", nullable: true })
	provider?: string; // "google" | "github" | null

	@Column({ type: "varchar", nullable: true })
	providerId?: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
