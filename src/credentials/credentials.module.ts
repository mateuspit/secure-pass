import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { UsersService } from "../users/users.service";
import { AuthRepository } from "../auth/auth.repository";
import { UsersRepository } from "../users/users.repository";

@Module({
    controllers: [CredentialsController],
    providers: [CredentialsService, CredentialsRepository, UsersService, AuthRepository, UsersRepository]
})
export class CredentialsModule { }
