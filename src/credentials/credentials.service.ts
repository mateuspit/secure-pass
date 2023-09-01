import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
    constructor(private readonly credentialRepository: CredentialsRepository) { }
    async getHealthCredentialService(): Promise<string> {
        return await this.credentialRepository.getHealthCredentialRepository();
    }
}
