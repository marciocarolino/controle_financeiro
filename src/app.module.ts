import { Module } from "@nestjs/common";
import { ClientModule } from "./app/client/client.module";
import { DataBaseModule } from "./db/entities/database.module";

@Module({
  imports: [DataBaseModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
