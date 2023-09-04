import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { credentialsDTO } from './DTO/credentials.DTO';

@Injectable()
export class CredentialsRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getHealthCredentialRepository(): Promise<string> {
        return (await this.prisma.health.findFirst({
            where: { route: "credentials" }
        })).health_names
    }

    async findCredencialByIdRepository(id: number): Promise<credentialsDTO> {
        return await this.prisma.credential.findFirst({
            where: {
                id
            }
        })
    }

    async findCredencialByTitleAndUserIdRepository(title: string, user_id: number): Promise<credentialsDTO> {
        return await this.prisma.credential.findFirst({
            where: {
                title,
                user_id
            }
        })
    }

    async createCredencialsRepository(credentialsBody: credentialsDTO): Promise<void> {
        await this.prisma.credential.create({
            data: {
                atTime: credentialsBody.atTime,
                password: credentialsBody.password,
                title: credentialsBody.title,
                url: credentialsBody.url,
                user_id: credentialsBody.user_id,
                username: credentialsBody.username
            }
        })
    }
    //type Prisma.CredentialUncheckedCreateInput = {
    //    id?: number;
    //    user_id: number;
    //    title: string;
    //    url: string;
    //    username: string;
    //    password: string;
    //    atTime: Date | string;
    //}

}
