import { HttpException, HttpStatus } from "@nestjs/common";

export class TitleCardsAlreadyCreated extends HttpException {
    constructor(title: string) {
        const message = `O titulo ${title} já está sendo usado`
        super(message, HttpStatus.CONFLICT)
    }
}

export class CardsNotFound extends HttpException {
    constructor(id: number) {
        const message = `A credential ${id} não foi encontrada`
        super(message, HttpStatus.NOT_FOUND)
    }
}

export class CardsForbidden extends HttpException {
    constructor() {
        const message = `Acesso negado!`
        super(message, HttpStatus.FORBIDDEN)
    }
}