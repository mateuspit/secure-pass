import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { User as UserPrisma } from '@prisma/client';
import { cardsDTO } from './DTO/cards.DTO';
import { User } from "../decorators/user.decorator"
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Cards routes")
@Controller('cards')
@ApiBearerAuth()
export class CardsController {
    constructor(private readonly cardService: CardsService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route cards" })
    async getHealthCardController(): Promise<string> {
        return await this.cardService.getHealthCardService();
    }

    @Post()
    async createCardsController(@Body() cardsBody: cardsDTO): Promise<void> {
        await this.cardService.createCardsService(cardsBody);
    }

    @Get()
    //async getAllCardsController(@User() user: UserPrisma): Promise<cardsDTO[]> {
    async getAllCardsController(@User() user: UserPrisma): Promise<cardsDTO[]> {
        return await this.cardService.getAllCardService(user.id);
    }

    @Get(":id")
    @ApiParam({ name: "id" })
    async getCardByIdController(@Param("id", ParseIntPipe) id: number): Promise<cardsDTO> {
        return await this.cardService.getCardByIdService(id);
    }

    @Delete(":id")
    @ApiParam({ name: "id" })
    //async deleteCardByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.cardService.deleteCardByIdService(id, user);
    async deleteCardByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.cardService.deleteCardByIdService(id);
    }
}
