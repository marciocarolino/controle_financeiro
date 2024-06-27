import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./client.entities";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number(process.env.PORT) || 5432,
      username: "postgres",
      password: "postgres",
      database: "financial_control",
      entities: [ClientEntity],
      migrations: [],
      synchronize: false,
    }),
  ],
})
export class DataBaseModule {}
