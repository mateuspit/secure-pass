import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { User as UserPrisma } from '@prisma/client';
import { cardsDTO } from './DTO/cards.DTO';
import { User } from "../decorators/user.decorator"
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Cards routes")
@Controller('cards')
@ApiBearerAuth()
export class CardsController {
    constructor(private readonly cardService: CardsService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route cards" })
    @ApiResponse({ status: HttpStatus.OK, description: "Cards route working!" })
    async getHealthCardController(): Promise<string> {
        return await this.cardService.getHealthCardService();
    }

    @Post()
    @ApiOperation({ summary: "Make a request for create new credit/debit/virtual card data" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Created card info data" })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: "Title in card info already in use!" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Some user cards input data invalid!" })
    async createCardsController(@Body() cardsBody: cardsDTO): Promise<void> {
        await this.cardService.createCardsService(cardsBody);
    }

    @Get()
    @ApiOperation({ summary: "Make a request to get all card data" })
    @ApiResponse({ status: HttpStatus.OK, description: "All user cards info data returned!" })
    //async getAllCardsController(@User() user: UserPrisma): Promise<cardsDTO[]> {
    async getAllCardsController(@User() user: UserPrisma): Promise<cardsDTO[]> {
        return await this.cardService.getAllCardService(user.id);
    }

    @Get(":id")
    @ApiParam({ name: "id" })
    @ApiOperation({ summary: "Make a request to get credit/debit/virtual card data by id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Specific user card data info returned!" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Specific user card data info not found!" })
    async getCardByIdController(@Param("id", ParseIntPipe) id: number): Promise<cardsDTO> {
        return await this.cardService.getCardByIdService(id);
    }

    @Delete(":id")
    @ApiParam({ name: "id" })
    @ApiOperation({ summary: "Make a request to delete credit/debit/virtual card data by id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Specific user card data info deleted!" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Specific user card data info not found" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Specific user card data info belongs to another user" })
    //async deleteCardByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.cardService.deleteCardByIdService(id, user);
    async deleteCardByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.cardService.deleteCardByIdService(id);
    }
}
