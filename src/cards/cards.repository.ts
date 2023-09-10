import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CardsDTO } from './DTO/cards.DTO';

@Injectable()
export class CardsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async deleteCardByIdRepository(id: number): Promise<void> {
        await this.prisma.credential.delete({
            where: {
                id
            }
        })
    }

    async getCardByIdRepository(id: number): Promise<CardsDTO> {
        return await this.prisma.card.findFirst({
            where: {
                id
            }
        });
    }

    async findCardByIdRepository(id: number): Promise<CardsDTO> {
        return await this.prisma.card.findFirst({
            where: {
                id
            }
        })
    }

    async getAllCardRepository(user_id: number): Promise<CardsDTO[]> {
        return await this.prisma.card.findMany({
            where: {
                user_id
            }
        });
    }

    async createCardsRepository(cardsBody: CardsDTO): Promise<void> {
        await this.prisma.card.create({
            data: {
                atTime: cardsBody.atTime,
                card_date: cardsBody.card_date,
                card_name: cardsBody.card_name,
                card_number: cardsBody.card_number,
                csc: cardsBody.csc,
                password: cardsBody.password,
                title: cardsBody.title,
                type: cardsBody.type,
                user_id: cardsBody.user_id,
                virtual: cardsBody.virtual,
            }
        })
    }

    async findCardByTitleAndUserIdRepository(title: string, user_id: number): Promise<CardsDTO> {
        return await this.prisma.card.findFirst({
            where: {
                title,
                user_id
            }
        })
    }

    async getHealthCardRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "cards" }
        })).health_names;
    }
}
