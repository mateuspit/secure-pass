import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { authDTO } from './DTO/auth.DTO';

@Injectable()
export class AuthRepository {

    async createSessionRepository(token: string, id: number): Promise<void> {
        await this.prisma.session.create({
            data: {
                atTime: new Date(),
                token,
                users_id: id
            }
        })
    }

    constructor(private readonly prisma: PrismaService) { }

    async getHealthAuthRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "auth" }
        })).health_names;
    }

}
