import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { PrismaService } from "../prisma/prisma.service";

@Module({
    controllers: [CredentialsController],
    providers: [CredentialsService, CredentialsRepository, PrismaService]
})
export class CredentialsModule { }
