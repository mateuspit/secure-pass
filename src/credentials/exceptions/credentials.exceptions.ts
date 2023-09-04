import { HttpException, HttpStatus } from "@nestjs/common";

export class TitleCredentialAlreadyCreated extends HttpException {
    constructor(title: string) {
        const message = `O titulo ${title} já está sendo usado`
        super(message, HttpStatus.CONFLICT)
    }
}

export class CredentialNotFound extends HttpException {
    constructor(id: number) {
        const message = `A credential ${id} não foi encontrada`
        super(message, HttpStatus.NOT_FOUND)
    }
}

export class CredentialForbidden extends HttpException {
    constructor() {
        const message = `Acesso negado!`
        super(message, HttpStatus.FORBIDDEN)
    }
}