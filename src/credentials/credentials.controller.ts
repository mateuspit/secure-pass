import { Controller, Get } from '@nestjs/common';
import { CredentialsService } from './credentials.service';

@Controller('credentials')
export class CredentialsController {
    constructor(private readonly credentialService: CredentialsService) { }

    @Get("health")
    async getHealthCredentialController(): Promise<string> {
        return await this.credentialService.getHealthCredentialService();
    }
}
