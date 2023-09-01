import { HttpException, HttpStatus } from "@nestjs/common";


export class SignInEmailAuthException extends HttpException {
    constructor(email: string) {
        const message = `E-mail ${email} não cadastrado!`;
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class SignInPassAuthException extends HttpException {
    constructor() {
        const message = `Senha incorreta!`;
        super(message, HttpStatus.UNAUTHORIZED);
    }
}