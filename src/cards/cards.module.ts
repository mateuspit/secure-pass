import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { PrismaService } from "../prisma/prisma.service"

@Module({
    controllers: [CardsController],
    providers: [CardsService, CardsRepository, PrismaService]
})
export class CardsModule { }
