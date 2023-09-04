import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { noteDTO } from './DTO/notes.DTO';

@Injectable()
export class NotesService {
    constructor(private readonly noteRepository: NotesRepository) { }
    async createNoteService(noteBody: noteDTO): Promise<void> {
        noteBody.atTime = new Date();
        await this.noteRepository.createNoteRepository(noteBody);
    }
    async getHealthNoteService(): Promise<string> {
        return await this.noteRepository.getHealthNoteRepository();
    }
}
