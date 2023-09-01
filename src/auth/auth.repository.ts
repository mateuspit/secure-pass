import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getHealthAuthRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "auth" }
        })).health_names;
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
}
