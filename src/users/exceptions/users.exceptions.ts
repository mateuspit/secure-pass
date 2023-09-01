import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailConflictAuthException extends HttpException {
    constructor(email: string) {
        const message = `E-mail ${email} já está em uso!`;
        super(message, HttpStatus.CONFLICT);
    }
}