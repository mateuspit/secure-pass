import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CardsDTO } from './DTO/cards.DTO';
import { CardsNotFound, TitleCardsAlreadyCreated } from './exceptions/cards.exceptions';

@Injectable()
export class CardsService {
    constructor(private readonly cardRepository: CardsRepository) { }

    //async deleteCardByIdService(id: number, user: singUpInDTO): Promise<void> {
    async deleteCardByIdService(id: number): Promise<void> {
        //verifica se a Card existe:
        //throw new CardNotFound(id);

        //verifica se a Card é do usuario
        //throw new CardForbidden();
        await this.cardRepository.deleteCardByIdRepository(id);
    }

    async findCardByIdService(id: number): Promise<CardsDTO> {
        const cardExists = await this.cardRepository.findCardByIdRepository(id);
        return cardExists;
    }

    async getCardByIdService(id: number): Promise<CardsDTO> {
        const cardExists = await this.findCardByIdService(id);
        if (!cardExists) {
            throw new CardsNotFound(id);
        }

        //token no headers
        //getuser from token e fazer forbidden
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const descryptedCardPassword = cryptr.decrypt(cardExists.password);
        const descryptedCardCSC = cryptr.decrypt(cardExists.csc);
        cardExists.password = descryptedCardPassword;
        cardExists.csc = descryptedCardCSC;

        return await this.cardRepository.getCardByIdRepository(id);
    }

    async getAllCardService(user_id: number): Promise<CardsDTO[]> {
        const descriptedCards: CardsDTO[] = [];
        const cardsExists = await this.cardRepository.getAllCardRepository(user_id);
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        if (cardsExists.length > 0) {
            for (const cobj of cardsExists) {
                const descriptedCard = { ...cobj };
                descriptedCard.password = cryptr.decrypt(cobj.password);
                descriptedCard.csc = cryptr.decrypt(cobj.csc);
                descriptedCards.push(descriptedCard);
            }
        }

        return descriptedCards;
    }

    async findCardByTitleAndUserIdService(title: string, user_id: number): Promise<CardsDTO> {
        const cardsExists = await this.cardRepository.findCardByTitleAndUserIdRepository(title, user_id);
        return cardsExists;
    }

    async createCardsService(cardsBody: CardsDTO): Promise<void> {
        const cardsExists = await this.findCardByTitleAndUserIdService(cardsBody.title, cardsBody.user_id);
        if (cardsExists) {
            throw new TitleCardsAlreadyCreated(cardsBody.title);
        }

        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const cryptedCardPassword = cryptr.encrypt(cardsBody.password);
        const cryptedCardCsc = cryptr.encrypt(cardsBody.password);

        cardsBody.password = cryptedCardPassword;
        cardsBody.csc = cryptedCardCsc;

        cardsBody.atTime = new Date();

        await this.cardRepository.createCardsRepository(cardsBody);
    }
    async getHealthCardService(): Promise<string> {
        return await this.cardRepository.getHealthCardRepository();
    }
}
