import { Body, Controller, Delete, ExecutionContext, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { credentialsDTO } from './DTO/credentials.DTO';
import { AuthGuard } from "../guards/auth.guards";
import { User as UserPrisma } from '@prisma/client';
import { User } from "../decorators/user.decorator";


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


    @Get()
    //async getAllCredentialController(@User() user: UserPrisma): Promise<credentialsDTO[]> {
    async getAllCredentialController(@User() user: UserPrisma): Promise<credentialsDTO[]> {
        return await this.credentialService.getAllCredentialService(user.id);
    }

    @Delete(":id")
    //async deleteCredentialByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.credentialService.deleteCredentialByIdService(id, user);
    async deleteCredentialByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.credentialService.deleteCredentialByIdService(id);
    }

}
