import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getHealthAppRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "app" }
        })).health_names;
    }
}
