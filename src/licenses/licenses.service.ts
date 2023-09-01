import { Injectable } from '@nestjs/common';
import { LicensesRepository } from './licenses.repository';

@Injectable()
export class LicensesService {
    constructor(private readonly licenseRepository: LicensesRepository) { }
    async getHealthLicenseService(): Promise<string> {
        return await this.licenseRepository.getHealthLicenseRepository();
    }
}
