import { Controller, Get } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('wifi')
export class WifiController {
    constructor(private readonly wifiService: WifiService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route wifi" })
    async getHealthWifiController(): Promise<string> {
        return await this.wifiService.getHealthWifiService();
    }
}
