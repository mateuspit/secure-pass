import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { noteDTO } from './DTO/notes.DTO';

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
}
