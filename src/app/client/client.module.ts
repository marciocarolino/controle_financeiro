import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "src/db/entities/client.entities";
import { BcryptConfig } from "src/utils/bcrypt.config";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientService, BcryptConfig],
  exports: [ClientService],
})
export class ClientModule {}
