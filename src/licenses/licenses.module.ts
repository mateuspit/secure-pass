import { Module } from '@nestjs/common';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { LicensesRepository } from './licenses.repository';
import { PrismaService } from "../prisma/prisma.service";

@Module({
    controllers: [LicensesController],
    providers: [LicensesService, LicensesRepository, PrismaService]
})
export class LicensesModule { }
