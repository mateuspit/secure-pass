import { Body, Controller, Get, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { credentialsDTO } from './DTO/credentials.DTO';
import { AuthGuard } from "../guards/auth.guards";


@Controller('credentials')
export class CredentialsController {
    constructor(private readonly credentialService: CredentialsService) { }

    @Get("health")
    async getHealthCredentialController(): Promise<string> {
        return await this.credentialService.getHealthCredentialService();
    }

    //@UseGuards(AuthGuard) // gu
    @Post()
    async createCredencialsController(@Body() credentialsBody: credentialsDTO): Promise<void> {
        await this.credentialService.createCredencialsService(credentialsBody);
    }

    @Get(":id")
    async getCredentialByIdController(@Param("id", ParseIntPipe) id: number): Promise<credentialsDTO> {
        return await this.credentialService.getCredentialByIdService(id);
    }
}
