import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Application main")
@Controller("health")
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiOperation({ summary: "Check appliation availability" })
    @ApiResponse({ status: HttpStatus.OK, description: "Wifi route working!" })
    async getHealthAppController(): Promise<string> {
        return await this.appService.getHealthAppService();
    }
}
