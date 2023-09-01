import { Controller, Get } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardService: CardsService) { }

    @Get("health")
    async getHealthCardController(): Promise<string> {
        return await this.cardService.getHealthCardService();
    }
}
