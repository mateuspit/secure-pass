import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
    constructor(private readonly appRepository: AppRepository) { }
    async getHealthAppService(): Promise<string> {
        return await this.appRepository.getHealthAppRepository();
    }
}
