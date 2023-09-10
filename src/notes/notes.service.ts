import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { NoteDTO } from './DTO/notes.DTO';
import { NoteNotFound, TitleNoteAlreadyCreated } from './exceptions/notes.exceptions';

@Injectable()
export class NotesService {

    constructor(private readonly noteRepository: NotesRepository) { }

    //async deleteNoteByIdService(id: number, user: singUpInDTO): Promise<void> {
    async deleteNoteByIdService(id: number): Promise<void> {
        //verifica se a note existe:
        //throw new NoteNotFound(id);

        //verifica se a credential é do usuario
        //throw new NoteForbidden();
        await this.noteRepository.deleteNoteByIdRepository(id);
    }

    async findNoteByIdService(id: number): Promise<NoteDTO> {
        const noteExists = await this.noteRepository.findNoteByIdRepository(id);
        return noteExists;
    }

    async getNoteByIdService(id: number): Promise<NoteDTO> {
        const noteExists = await this.findNoteByIdService(id);
        if (!noteExists) {
            throw new NoteNotFound(id);
        }

        //token no headers
        //getuser from token e fazer forbidden
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const descryptedNote = cryptr.decrypt(noteExists.note);
        noteExists.note = descryptedNote;

        return await this.noteRepository.getNoteByIdRepository(id);
    }

    async getAllNoteService(user_id: number): Promise<NoteDTO[]> {
        const descriptedNotes: NoteDTO[] = [];
        const notesExists = await this.noteRepository.getAllNoteRepository(user_id);
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        if (notesExists.length > 0) {
            for (const cobj of notesExists) {
                const descriptedNote = { ...cobj };
                descriptedNote.note = cryptr.decrypt(cobj.note);
                descriptedNotes.push(descriptedNote);
            }
        }

        return descriptedNotes;
    }

    async findNoteByTitleAndUserIdService(title: string, user_id: number): Promise<NoteDTO> {
        const noteExists = await this.noteRepository.findNoteByTitleAndUserIdRepository(title, user_id);
        return noteExists;
    }

    async createNoteService(noteBody: NoteDTO): Promise<void> {
        const noteExists = await this.findNoteByTitleAndUserIdService(noteBody.title, noteBody.user_id);
        if (noteExists) {
            throw new TitleNoteAlreadyCreated(noteBody.title);
        }

        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const cryptedNote = cryptr.encrypt(noteBody.note);

        noteBody.note = cryptedNote;
        noteBody.atTime = new Date();
        await this.noteRepository.createNoteRepository(noteBody);
    }
    async getHealthNoteService(): Promise<string> {
        return await this.noteRepository.getHealthNoteRepository();
    }
}
