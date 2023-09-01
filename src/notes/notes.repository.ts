import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthNoteRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "notes" }
        })).health_names;
    }
}
