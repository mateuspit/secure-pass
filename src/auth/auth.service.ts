import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { singUpDTO } from './DTO/auth.DTO';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }

    async getHealthAuthService(): Promise<string> {
        return await this.authRepository.getHealthAuthRepository();
    }

    async signUpService(body: singUpDTO): Promise<void> {
        const { password, email } = body;
        const saltOrRounds = 10;
        const cryptedPass = await bcrypt.hash(password, saltOrRounds);

        await this.authRepository.signUpRepository(cryptedPass, email);
    }
}
