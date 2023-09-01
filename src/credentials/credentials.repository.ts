import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CredentialsRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthCredentialRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "credentials" }
        })).health_names
    }
}
