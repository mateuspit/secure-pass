import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { noteDTO } from './DTO/notes.DTO';
import { User } from "../decorators/user.decorator";
import { User as UserPrisma } from '@prisma/client';

@Controller('notes')
export class NotesController {
    constructor(private readonly noteService: NotesService) { }

    @Get("health")
    async getHealthNoteController(): Promise<string> {
        return await this.noteService.getHealthNoteService();
    }

    @Post()
    async createNoteController(@Body() noteBody: noteDTO): Promise<void> {
        await this.noteService.createNoteService(noteBody)
    }

    @Get()
    //async getAllNoteController(@User() user: UserPrisma): Promise<noteDTO[]> {
    async getAllNoteController(@User() user: UserPrisma): Promise<noteDTO[]> {
        return await this.noteService.getAllNoteService(user.id);
    }

    @Get(":id")
    async getNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<noteDTO> {
        return await this.noteService.getNoteByIdService(id);
    }

    @Delete(":id")
    //async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.noteService.deleteNoteByIdService(id, user);
    async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.noteService.deleteNoteByIdService(id);
    }
}
