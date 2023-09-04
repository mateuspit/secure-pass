import { Controller, Get } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Wifi routes")
@Controller('wifi')
export class WifiController {
    constructor(private readonly wifiService: WifiService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route wifi" })
    async getHealthWifiController(): Promise<string> {
        return await this.wifiService.getHealthWifiService();
    }
}
