import { Module } from '@nestjs/common';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { LicensesRepository } from './licenses.repository';

@Module({
    controllers: [LicensesController],
    providers: [LicensesService, LicensesRepository]
})
export class LicensesModule { }
