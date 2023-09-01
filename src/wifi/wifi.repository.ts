import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WifiRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthWifiRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "wifi" }
        })).health_names;
    }
}
