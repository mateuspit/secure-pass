import { faker } from "@faker-js/faker"
import { PrismaService } from "../../src/prisma/prisma.service";

export class CredentialsFactory {
    private url: string;
    private username: string;
    private password: string;
    private title: string;
    constructor(url?: string, username?: string, password?: string, title?: string) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.title = title;
    }

    buildFaker() {
        return {
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            title: faker.company.name()
        }
    }

    async buildDBFaker(prisma: PrismaService, user_id: number) {
        return await prisma.credential.create({
            data: {
                atTime: new Date(),
                password: faker.internet.password(),
                title: faker.company.name(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                user_id: user_id
            }
        })
    }
}