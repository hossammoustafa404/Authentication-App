import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from "typeorm";
import { CustomBaseEntity } from "./custom_base_entity";
import RefreshToken from "./refresh_token";
import hash from "../lib/hash";

export const userRoles = ["super_admin", "admin", "user"];

@Entity()
export default class SiteUser extends CustomBaseEntity {
  @Column({ length: 21, nullable: false })
  first_name: string;

  @Column({ length: 21, nullable: false })
  last_name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({ length: 50, nullable: false, unique: true })
  email: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ enum: userRoles, default: "user" })
  role: string;

  @Column({ nullable: true, select: false })
  verify_token: string;

  @Column({ nullable: true, select: false })
  reset_pass_token: string;

  @OneToMany((type) => RefreshToken, (refresh_token) => refresh_token.site_user)
  refresh_tokens: RefreshToken[];
}
