import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { credentialsDTO } from './DTO/credentials.DTO';
import { CredentialNotFound, TitleCredentialAlreadyCreated } from './exceptions/credentials.exceptions';
import { UsersService } from "../users/users.service";
import { singUpInDTO } from 'src/users/DTO/users.DTO';
//import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {

    constructor(private readonly credentialRepository: CredentialsRepository,
        private readonly userService: UsersService) { }


    //async deleteCredentialByIdService(id: number, user: singUpInDTO): Promise<void> {
    async deleteCredentialByIdService(id: number): Promise<void> {
        //verifica se a credential existe:
        //throw new CredentialNotFound(id);

        //verifica se a credential é do usuario
        //throw new CredentialForbidden();
        await this.credentialRepository.deleteCredentialByIdRepository(id);
    }

    async getAllCredentialService(user_id: number): Promise<credentialsDTO[]> {
        const descriptedCredentials: credentialsDTO[] = [];
        const credentialExists = await this.credentialRepository.getAllCredentialRepository(user_id);
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        if (credentialExists.length > 0) {
            for (const cobj of credentialExists) {
                const descriptedCredential = { ...cobj };
                descriptedCredential.password = cryptr.decrypt(cobj.password);
                descriptedCredentials.push(descriptedCredential);
            }
        }

        return descriptedCredentials;
    }

    async getCredentialByIdService(id: number): Promise<credentialsDTO> {
        const credentialExists = await this.findCredencialByIdService(id);
        if (!credentialExists) {
            throw new CredentialNotFound(id);
        }

        //token no headers
        //getuser from token e fazer forbidden
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

        const descryptedCredentialPassword = cryptr.decrypt(credentialExists.password);
        credentialExists.password = descryptedCredentialPassword;

        return await this.credentialRepository.getCredentialByIdRepository(id);
    }


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

        await this.credentialRepository.createCredencialsRepository(credentialsBody);
    }

}
