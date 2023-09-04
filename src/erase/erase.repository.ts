import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EraseRepository {
    constructor(private readonly prisma: PrismaService) { }

    async deleteCardsRepository(id: number) {
        return await this.prisma.card.deleteMany({
            where: { id }
        })
    }
    async deleteNotesRepository(id: number) {
        return await this.prisma.note.deleteMany({
            where: { id }
        })
    }
    async deleteCredentialsRepository(id: number) {
        return await this.prisma.credential.deleteMany({
            where: { id }
        })
    }
    async deleteSessionsRepository(id: number) {
        return await this.prisma.session.deleteMany({
            where: { id }
        })
    }
    async deleteUsersRepository(id: number) {
        return await this.prisma.user.deleteMany({
            where: { id }
        })
    }


    async getHealthEraseRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "erase" }
        })).health_names;
    }
}
