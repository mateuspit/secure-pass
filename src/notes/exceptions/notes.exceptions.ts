import { HttpException, HttpStatus } from "@nestjs/common";

export class TitleNoteAlreadyCreated extends HttpException {
    constructor(title: string) {
        const message = `O titulo ${title} já está sendo usado`
        super(message, HttpStatus.CONFLICT)
    }
}

export class NoteNotFound extends HttpException {
    constructor(id: number) {
        const message = `A credential ${id} não foi encontrada`
        super(message, HttpStatus.NOT_FOUND)
    }
}

export class NoteForbidden extends HttpException {
    constructor() {
        const message = `Acesso negado!`
        super(message, HttpStatus.FORBIDDEN)
    }
}