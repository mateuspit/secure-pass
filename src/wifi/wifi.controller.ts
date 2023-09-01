import { Controller, Get } from '@nestjs/common';
import { WifiService } from './wifi.service';

@Controller('wifi')
export class WifiController {
    constructor(private readonly wifiService: WifiService) { }

    @Get("health")
    async getHealthWifiController(): Promise<string> {
        return await this.wifiService.getHealthWifiService();
    }
}
