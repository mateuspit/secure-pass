import { HttpException, HttpStatus } from "@nestjs/common";


export class DeletePasswordException extends HttpException {
    constructor() {
        const message = `Senha incorreta!`;
        super(message, HttpStatus.UNAUTHORIZED);
    }
}