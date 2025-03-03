import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "src/db/entities/client.entities";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/createClient.dto";
import { v4 as uuidv4 } from "uuid";
import { CustomException } from "src/utils/exception";
import { BcryptConfig } from "src/utils/bcrypt.config";
import { UpdateClientDto } from "./dto/updateClient.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class ClientService {
  constructor(
    private readonly bcryptConfig: BcryptConfig,
    @InjectRepository(ClientEntity)
    private readonly clientEntity: Repository<ClientEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getAllUser(): Promise<any> {
    return await this.clientEntity.find({ where: { actived: true } });
  }

  async createClient(createClient: CreateClientDto): Promise<any> {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: createClient.email },
    });

    if (verifyClient) {
      throw new CustomException(
        "E-mail already registered",
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await this.bcryptConfig.hashPassword(
      createClient.password
    );

    const create = this.clientEntity.create({
      id: uuidv4(),
      name: createClient.name,
      email: createClient.email,
      password: hashedPassword,
      actived: true,
      role: "verify",
      created_at: new Date(),
    });

    const saveClient = await this.clientEntity.save(create);
    // this.eventEmitter.emit("client.created", saveClient);

    return saveClient;
  }

  async updateClient(email: string, body: UpdateClientDto): Promise<any> {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: email },
    });

    if (!verifyClient) {
      throw new Error("Client not Found");
    }

    verifyClient.updated_at = new Date();
    verifyClient.actived = true;
    verifyClient.email = body.email;
    verifyClient.name = body.name;

    return await this.clientEntity.save(verifyClient);
  }

  async deleteClient(email: string): Promise<any> {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: email },
    });

    if (!verifyClient) {
      throw new CustomException("Client not Found", HttpStatus.NOT_FOUND);
    }

    verifyClient.updated_at = new Date();
    verifyClient.actived = false;

    return this.clientEntity.save(verifyClient);
  }
}
