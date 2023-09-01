import { Injectable } from '@nestjs/common';
import { EraseRepository } from './erase.repository';

@Injectable()
export class EraseService {
    constructor(private readonly eraseRepository: EraseRepository) { }

    async getHealthEraseService(): Promise<string> {
        return await this.eraseRepository.getHealthEraseRepository();
    }
}
