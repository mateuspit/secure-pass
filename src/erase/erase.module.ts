import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { EraseRepository } from './erase.repository';
import { PrismaService } from "../prisma/prisma.service"
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";

@Module({
    controllers: [EraseController],
    providers: [EraseService, EraseRepository, PrismaService, UsersService, UsersRepository]
})
export class EraseModule { }
