import { faker } from "@faker-js/faker";
import { PrismaService } from "../../src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

export class SignUpData {
    private _email: string;
    private _password: string;

    constructor(email?: string, password?: string) {
        this._email = email;
        this._password = password;
    }

    buildFaker() {
        return {
            email: faker.internet.email(),
            password: `S3nh@56789`,
        };
    }

    async buildDBFaker(prisma: PrismaService) {
        const SALT_ROUNDS = 10;
        const email = faker.internet.email();
        const atTime = new Date();
        const password = `S3nh@56789`;
        await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, SALT_ROUNDS),
                atTime,
            },
        });
        return {
            email,
            password,
            atTime,
        };
    }
}
