import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { singUpInDTO } from './DTO/users.DTO';
import { EmailConflictAuthException } from './exceptions/users.exceptions';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) { }

    async getHealthUserService(): Promise<string> {
        return await this.userRepository.getHealthUserRepository();
    }

    async findAccByEmailService(email: string): Promise<singUpInDTO> {
        const accExists = await this.userRepository.findAccByEmailRepository(email)

        return accExists;
    }

    async findUserByTokenService(token: string): Promise<singUpInDTO> {
        const userDataByToken = await this.userRepository.findUserByTokenRepository(token);
        if (!userDataByToken) throw new NotFoundException("User not found!");
        return userDataByToken.User;
    }

    async signUpUserService(body: singUpInDTO): Promise<void> {
        const { password, email } = body;

        const accExists = await this.findAccByEmailService(email)

        if (accExists) {
            throw new EmailConflictAuthException(email);
        }

        const SALTORROUNDS = 10;
        const cryptedPass = await bcrypt.hash(password, SALTORROUNDS);
        await this.userRepository.signUpRepository(cryptedPass, email);
    }

    async getUserByIdService(id: number) {
        const user = await this.userRepository.getByIdRepository(id);
        if (!user) throw new NotFoundException("User not found!");

        return user;
    }
}
