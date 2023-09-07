import { Body, Controller, Delete, Get, HttpStatus } from '@nestjs/common';
import { EraseService } from './erase.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { authDTO } from 'src/auth/DTO/auth.DTO';

@Controller('erase')
@ApiTags("Erase routes")
export class EraseController {
    constructor(private readonly eraseService: EraseService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route erase" })
    async getHealthEraseController(): Promise<string> {
        return await this.eraseService.getHealthEraseService();
    }

    @Delete()
    @ApiOperation({ summary: "Delete your account with ALL your data" })
    @ApiResponse({ status: HttpStatus.OK, description: "Erase route working!" })
    async deleteEverythingController(@Body() bodyPassword: Pick<authDTO, 'password'>): Promise<void> {
        await this.eraseService.deleteEverythingService(bodyPassword.password);
    }
}
