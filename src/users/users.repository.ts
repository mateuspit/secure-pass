import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { singUpInDTO } from './DTO/users.DTO';

@Injectable()
export class UsersRepository {

    async findUserByTokenRepository(token: string) {
        return await this.prisma.session.findFirst({
            where: {
                token
            },
            include: {
                User: true
            }
        });
    }

    constructor(private readonly prisma: PrismaService) { }
    async getHealthUserRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "users" }
        })).health_names;
    }

    async findAccByEmailRepository(email: string): Promise<singUpInDTO> {
        return await this.prisma.user.findFirst({
            where: { email }
        })
    }

    async signUpRepository(cryptedPass: string, email: string): Promise<void> {
        await this.prisma.user.create({
            data: {
                email,
                password: cryptedPass,
                atTime: new Date()
            }
        })
    };

    async getByIdRepository(id: number) {
        return await this.prisma.user.findUnique({
            where: { id }
        })
    }
}
