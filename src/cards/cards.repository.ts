import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CardsRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthCardRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "cards" }
        })).health_names;
    }
}
