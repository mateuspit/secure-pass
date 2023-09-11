import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { authDTO } from './DTO/auth.DTO';
import { UsersService } from "../users/users.service";
import { SignInEmailAuthException, SignInPassAuthException } from './exceptions/auth.exceptions';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly EXPIRATION_TIME = "7 days";
    private readonly ISSUER = "secure pass";
    private readonly AUDIENCE = "users"

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly authRepository: AuthRepository
    ) { }

    async signUpAuthService(body: authDTO) {
        await this.userService.signUpUserService(body);
    }

    async signInAuthService(body: authDTO): Promise<object> {
        const { email, password } = body;

        const accExists = await this.userService.findAccByEmailService(email);

        if (!accExists) {
            throw new SignInEmailAuthException(email);
        }

        body.id = accExists.id;

        const passIsCorrect = bcrypt.compareSync(password, accExists.password);

        if (!passIsCorrect) {
            throw new SignInPassAuthException();
        }

        const token = this.createTokenService(body)

        await this.authRepository.createSessionRepository(token.token, accExists.id);

        return token;
    }

    private createTokenService(body: authDTO) {
        const { id, email } = body;
        const token = this.jwtService.sign({ email }, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })
        return { token };
    }

    checkToken(token: string) {
        console.log(token);
        const data = this.jwtService.verify(token, {
            audience: this.AUDIENCE,
            issuer: this.ISSUER
        });
        return data;
    }

    async getHealthAuthService(): Promise<string> {
        return await this.authRepository.getHealthAuthRepository();
    }


}
