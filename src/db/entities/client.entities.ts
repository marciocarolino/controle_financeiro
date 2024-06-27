import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountsEntity } from "./accounts.entities";

@Entity({ name: "client" })
export class ClientEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "email", type: "varchar" })
  email: string;

  @Column({ name: "active", default: true })
  actived: boolean;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @Column({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => AccountsEntity, (accounts) => accounts.client)
  accounts: AccountsEntity;
}
