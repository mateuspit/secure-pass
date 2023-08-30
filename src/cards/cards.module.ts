import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CredentialsRepository } from 'src/credentials/credentials.repository';

@Module({
    controllers: [CardsController],
    providers: [CardsService, CredentialsRepository]
})
export class CardsModule { }
