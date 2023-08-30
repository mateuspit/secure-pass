import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { EraseRepository } from './erase.repository';

@Module({
    controllers: [EraseController],
    providers: [EraseService, EraseRepository]
})
export class EraseModule { }
