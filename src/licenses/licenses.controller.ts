import { Controller, Get, HttpStatus } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('licenses')
@ApiTags("Licenses routes")
export class LicensesController {
    constructor(private readonly licenseService: LicensesService) { }

    @Get("health")
    @ApiResponse({ status: HttpStatus.OK, description: "License route working!" })
    @ApiOperation({ summary: "Check availability in route licenses" })
    async getHealthLicenseController(): Promise<string> {
        return await this.licenseService.getHealthLicenseService();
    }
}
