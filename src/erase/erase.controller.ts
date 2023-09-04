import { Controller, Get } from '@nestjs/common';
import { EraseService } from './erase.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('erase')
@ApiTags("Erase routes")
export class EraseController {
    constructor(private readonly eraseService: EraseService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route erase" })
    async getHealthEraseController(): Promise<string> {
        return await this.eraseService.getHealthEraseService();
    }
}
