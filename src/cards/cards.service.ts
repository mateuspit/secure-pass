import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
    constructor(private readonly cardRepository: CardsRepository) { }
    async getHealthCardService(): Promise<string> {
        return await this.cardRepository.getHealthCardRepository();
    }
}
