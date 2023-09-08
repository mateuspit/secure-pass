import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UsersModule } from "../users/users.module";
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";

@Global()
@Module({
    imports: [UsersModule, JwtModule.register({
        secret: process.env.JWT_SECRET
    })],
    providers: [AuthService, AuthRepository, UsersService, UsersRepository],
    controllers: [AuthController]
})
export class AuthModule { }
