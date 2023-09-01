import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { EraseRepository } from './erase.repository';
import { PrismaService } from "../prisma/prisma.service"

@Module({
    controllers: [EraseController],
    providers: [EraseService, EraseRepository, PrismaService]
})
export class EraseModule { }
