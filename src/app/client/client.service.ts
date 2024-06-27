import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientEntity } from "src/db/entities/client.entities";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/createClient.dto";
import { v4 as uuidv4 } from "uuid";
import { CustomException } from "src/utils/exception";
import { BcryptConfig } from "src/utils/bcrypt.config";
import { UpdateClientDto } from "./dto/updateClient.dto";

@Injectable()
export class ClientService {
  constructor(
    private readonly bcryptConfig: BcryptConfig,
    @InjectRepository(ClientEntity)
    private readonly clientEntity: Repository<ClientEntity>,
  ) {}

  async getAllUser(): Promise<any> {
    return await this.clientEntity.find();
  }

  async createClient(createClient: CreateClientDto): Promise<any> {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: createClient.email },
    });

    if (verifyClient) {
      throw new CustomException(
        "E-mail already registered",
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this.bcryptConfig.hashPassword(
      createClient.password,
    );

    const create = this.clientEntity.create({
      id: uuidv4(),
      name: createClient.name,
      email: createClient.email,
      password: hashedPassword,
      actived: true,
      created_at: new Date(),
    });

    return await this.clientEntity.save(create);
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
  }

  async deleteClient(email: string): Promise<any> {
    const verifyClient = await this.clientEntity.findOne({
      where: { email: email },
    });

    if (!verifyClient) {
      throw new Error("Client not Found");
    }

    verifyClient.updated_at = new Date();
    verifyClient.actived = false;

    return this.clientEntity.save(verifyClient);
  }
}
