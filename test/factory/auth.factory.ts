import { faker } from "@faker-js/faker";

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
            password: `S3nh@56789`
        };
    }

}