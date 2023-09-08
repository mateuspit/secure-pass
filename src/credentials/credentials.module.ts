import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { AuthService } from "../auth/auth.service";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { AuthRepository } from "../auth/auth.repository";
import { UsersRepository } from "../users/users.repository";

@Module({
    controllers: [CredentialsController],
    providers: [CredentialsService, CredentialsRepository, AuthService, JwtService, UsersService, AuthRepository, UsersRepository]
})
export class CredentialsModule { }
