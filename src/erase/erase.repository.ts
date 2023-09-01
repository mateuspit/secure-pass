import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EraseRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getHealthEraseRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "erase" }
        })).health_names;
    }
}
