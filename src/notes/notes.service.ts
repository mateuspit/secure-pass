import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
    constructor(private readonly noteRepository: NotesRepository) { }
    async getHealthNoteService(): Promise<string> {
        return await this.noteRepository.getHealthNoteRepository();
    }
}
