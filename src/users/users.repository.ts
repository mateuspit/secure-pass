import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthUserRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "users" }
        })).health_names;
    }
}
