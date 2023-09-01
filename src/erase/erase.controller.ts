import { Controller, Get } from '@nestjs/common';
import { EraseService } from './erase.service';

@Controller('erase')
export class EraseController {
    constructor(private readonly eraseService: EraseService) { }

    @Get("health")
    async getHealthEraseController(): Promise<string> {
        return await this.eraseService.getHealthEraseService();
    }
}
