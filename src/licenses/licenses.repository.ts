import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LicensesRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthLicenseRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "licenses" }
        })).health_names
    }
}
