import { Controller, Get } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('licenses')
@ApiTags("Licenses routes")
export class LicensesController {
    constructor(private readonly licenseService: LicensesService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route licenses" })
    async getHealthLicenseController(): Promise<string> {
        return await this.licenseService.getHealthLicenseService();
    }
}
