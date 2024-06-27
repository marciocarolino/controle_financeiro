import { Module } from "@nestjs/common";
import { ClientModule } from "./app/client/client.module";
import { DataBaseModule } from "./db/entities/database.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [EventEmitterModule.forRoot(), DataBaseModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
