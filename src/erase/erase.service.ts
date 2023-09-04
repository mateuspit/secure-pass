import { Injectable } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import { UsersService } from "../users/users.service";
import { DeletePasswordException } from './exceptions/erase.exceptions';
import * as bcrypt from "bcrypt";

@Injectable()
export class EraseService {
    constructor(private readonly eraseRepository: EraseRepository,
        private readonly userService: UsersService) { }

    async deleteEverythingService(bodyPassword: string) {
        const tokenChumbado = `token`;
        //deletar wifi
        //deletar licenses
        const userAcc = await this.userService.findUserByTokenService(tokenChumbado);
        const passIsCorrect = bcrypt.compareSync(bodyPassword, userAcc.password);

        if (passIsCorrect) {
            await this.eraseRepository.deleteCredentialsRepository(userAcc.id);
            await this.eraseRepository.deleteNotesRepository(userAcc.id);
            await this.eraseRepository.deleteCardsRepository(userAcc.id);
            await this.eraseRepository.deleteSessionsRepository(userAcc.id);
            return await this.eraseRepository.deleteUsersRepository(userAcc.id);
        }
        throw new DeletePasswordException();
    }

    async getHealthEraseService(): Promise<string> {
        return await this.eraseRepository.getHealthEraseRepository();
    }
}
