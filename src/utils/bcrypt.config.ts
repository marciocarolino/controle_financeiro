import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptConfig {
  private readonly saltRounds = 10;

  async hashPassword(passowrd: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(passowrd, this.saltRounds);
    return hashedPassword;
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    return isPasswordMatching;
  }
}
