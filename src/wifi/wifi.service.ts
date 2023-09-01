import { Injectable } from '@nestjs/common';
import { WifiRepository } from './wifi.repository';

@Injectable()
export class WifiService {
    constructor(private readonly wifiRepository: WifiRepository) { }

    async getHealthWifiService(): Promise<string> {
        return await this.wifiRepository.getHealthWifiRepository();
    }
}
