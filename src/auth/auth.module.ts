import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from "../prisma/prisma.service";
import { AuthRepository } from './auth.repository';

@Module({
    providers: [AuthService, PrismaService, AuthRepository],
    controllers: [AuthController]
})
export class AuthModule { }
