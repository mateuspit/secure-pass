import { HttpException, HttpStatus } from "@nestjs/common";

export class TitleCredentialAlreadyCreated extends HttpException {
    constructor(title: string) {
        const message = `O titulo ${title} já está sendo usado`
        super(message, HttpStatus.CONFLICT)
    }
}