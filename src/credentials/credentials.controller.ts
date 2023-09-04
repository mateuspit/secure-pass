import { Body, Controller, Get, Post } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { credentialsDTO } from './DTO/credentials.DTO';

@Controller('credentials')
export class CredentialsController {
    constructor(private readonly credentialService: CredentialsService) { }

    @Get("health")
    async getHealthCredentialController(): Promise<string> {
        return await this.credentialService.getHealthCredentialService();
    }

    @Post()
    async createCredencialsController(@Body() credentialsBody: credentialsDTO): Promise<void> {
        await this.credentialService.createCredencialsService(credentialsBody);
    }
}
