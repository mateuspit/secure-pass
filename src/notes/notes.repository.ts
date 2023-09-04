import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { noteDTO } from './DTO/notes.DTO';

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async deleteNoteByIdRepository(id: number): Promise<void> {
        await this.prisma.note.delete({
            where: {
                id
            }
        })
    }

    async getNoteByIdRepository(id: number): Promise<noteDTO> {
        return await this.prisma.note.findFirst({
            where: {
                id
            }
        });
    }

    async findNoteByIdRepository(id: number): Promise<noteDTO> {
        return await this.prisma.note.findFirst({
            where: {
                id
            }
        })
    }

    async getAllNoteRepository(user_id: number): Promise<noteDTO[]> {
        return await this.prisma.note.findMany({
            where: {
                user_id
            }
        });
    }

    async findNoteByTitleAndUserIdRepository(title: string, user_id: number): Promise<noteDTO> {
        return await this.prisma.note.findFirst({
            where: {
                title,
                user_id
            }
        })
    }


    async createNoteRepository(noteBody: noteDTO) {
        await this.prisma.note.create({
            data: {
                atTime: noteBody.atTime,
                note: noteBody.note,
                title: noteBody.title,
                user_id: noteBody.user_id
            }
        })
    }
    async getHealthNoteRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "notes" }
        })).health_names;
    }
}
