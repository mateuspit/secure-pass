import { Controller, Get } from '@nestjs/common';
import { LicensesService } from './licenses.service';

@Controller('licenses')
export class LicensesController {
    constructor(private readonly licenseService: LicensesService) { }

    @Get("health")
    async getHealthLicenseController(): Promise<string> {
        return await this.licenseService.getHealthLicenseService();
    }
}
