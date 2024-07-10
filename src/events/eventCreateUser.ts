import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "src/db/entities/client.entities";
import { Repository } from "typeorm";

@Injectable()
export class EventCreateUser {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientEntity: Repository<ClientEntity>,
    private eventEmitter: EventEmitter2
  ) {}

  @OnEvent("client.created")
  async handleClientCreatedEvent(client: ClientEntity) {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: client.email },
    });

    if (!verifyClient) {
      throw new Error("Client not Found");
    }
    verifyClient.role = "Admin";

    await this.clientEntity.save(verifyClient);
  }
}
