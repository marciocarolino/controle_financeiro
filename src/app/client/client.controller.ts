import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/createClient.dto";
import { UpdateClientDto } from "./dto/updateClient.dto";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.clientService.getAllUser();
  }

  @Post()
  async createClient(@Body() createClient: CreateClientDto): Promise<any> {
    return await this.clientService.createClient(createClient);
  }

  @Put(":email")
  async updateClient(
    @Body() updateClient: UpdateClientDto,
    @Param("email") email: string,
  ): Promise<any> {
    return await this.clientService.updateClient(email, updateClient);
  }

  @Delete(":email")
  async deleteClient(@Param("email") email: string) {
    return await this.clientService.deleteClient(email);
  }
}
