import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "./client.entities";

@Entity({ name: "accounts" })
export class AccountsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "accountName" })
  accountName: string;

  //Tipo da conta ex: Luz, água,  etc...
  @Column({ name: "accountType" })
  accountType: string;

  //Conta de entrada
  @Column({ name: "entryAccount" })
  entryAccount: boolean;

  //Conta de saida
  @Column({ name: "outgoingAccount" })
  outgoingAccount: boolean;

  @Column({ name: "valueAccount", type: "decimal" })
  valueAccount: number;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @Column({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  // @ManyToOne(() => ClientEntity, (client) => client.accounts)
  // client: ClientEntity;
}
