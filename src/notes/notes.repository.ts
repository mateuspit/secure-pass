import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { noteDTO } from './DTO/notes.DTO';

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createNoteRepository(noteBody: noteDTO) {
        await this.prisma.note.create({
            data: {
                atTime: noteBody.atTime,
                note: noteBody.note,
                title: noteBody.title,
                user_id: noteBody.userId
            }
        })
    }
    async getHealthNoteRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "notes" }
        })).health_names;
    }
}
