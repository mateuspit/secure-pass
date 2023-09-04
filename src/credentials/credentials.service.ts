import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { credentialsDTO } from './DTO/credentials.DTO';
import { TitleCredentialAlreadyCreated } from './exceptions/credentials.exceptions';
//import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {

    async getCredentialByIdService(id: number): Promise<credentialsDTO> {
        return await ;
    }

    constructor(private readonly credentialRepository: CredentialsRepository) { }
    async getHealthCredentialService(): Promise<string> {
        return await this.credentialRepository.getHealthCredentialRepository();
    }

    async findCredencialByIdService(id: number): Promise<credentialsDTO> {
        const credencialExists = await this.credentialRepository.findCredencialByIdRepository(id);
        return credencialExists;
    }

    async findCredencialByTitleAndUserIdService(title: string, user_id: number): Promise<credentialsDTO> {
        const credencialExists = await this.credentialRepository.findCredencialByTitleAndUserIdRepository(title, user_id);
        return credencialExists;
    }

    async createCredencialsService(credentialsBody: credentialsDTO): Promise<void> {
        const credencialExists = await this.findCredencialByTitleAndUserIdService(credentialsBody.title, credentialsBody.user_id);
        if (credencialExists) {
            throw new TitleCredentialAlreadyCreated(credentialsBody.title);
        }

        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const cryptedCredentialPassword = cryptr.encrypt(credentialsBody.password);

        credentialsBody.password = cryptedCredentialPassword;

        credentialsBody.atTime = new Date();

        console.log(credentialsBody);

        await this.credentialRepository.createCredencialsRepository(credentialsBody);
    }

}
