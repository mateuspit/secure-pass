import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from "../src/prisma/prisma.service"
import { CredentialsFactory } from './factory/credentials.factory';
import { SignUpDataFactory } from './factory/users.factory';

let app: INestApplication;
let prisma: PrismaService = new PrismaService();

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(PrismaService)
        .useValue(prisma)
        .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
});

afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
})

const CREATE_CREDENTIALS_ROUTE = `/credentials`;
const HEALTH_ROUTE = `/credentials/health`;

describe('CredentialController (e2e)', () => {

    it('GET /health', () => {
        return request(app.getHttpServer())
            .get(HEALTH_ROUTE)
            .expect(200)
            .expect(`credentials okay!`);
    });

    it("POST /credentials => should return status code 400 for empty credential pass input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        credentialData.password = "";

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for empty credential title input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        credentialData.title = "";

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for empty credential url input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        credentialData.url = "";

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for empty credential user input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        credentialData.username = "";

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for missing credential pass input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        delete credentialData.password

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for missing credential title input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        delete credentialData.title;

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for missing credential url input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        delete credentialData.url;

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for missing credential user input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();
        delete credentialData.username;

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("POST /credentials => should return status code 400 for non-string credential pass input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();

        const scenarios = [
            { password: 0 },
            { password: true },
            { password: false },
            { password: null },
            { password: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(CREATE_CREDENTIALS_ROUTE)
                .send({
                    ...credentialData,
                    password: scenario.password
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /credentials => should return status code 400 for non-string credential title input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();

        const scenarios = [
            { title: 0 },
            { title: true },
            { title: false },
            { title: null },
            { title: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(CREATE_CREDENTIALS_ROUTE)
                .send({
                    ...credentialData,
                    title: scenario.title
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /credentials => should return status code 400 for non-string credential url input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();

        const scenarios = [
            { url: 0 },
            { url: true },
            { url: false },
            { url: null },
            { url: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(CREATE_CREDENTIALS_ROUTE)
                .send({
                    ...credentialData,
                    url: scenario.url
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /credentials => should return status code 400 for non-string credential user input data", async () => {
        const credentialData = new CredentialsFactory().buildFaker();

        const scenarios = [
            { user: 0 },
            { user: true },
            { user: false },
            { user: null },
            { user: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(CREATE_CREDENTIALS_ROUTE)
                .send({
                    ...credentialData,
                    username: scenario.user
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /credentials => should return status code 409 for already use credential title input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const credentialData = await new CredentialsFactory().buildDBFaker(prisma, signUpData.id);
        const credentialSameTitle = {
            username: new CredentialsFactory().buildFaker().username,
            title: credentialData.title,
            url: new CredentialsFactory().buildFaker().url,
            password: new CredentialsFactory().buildFaker().password,
        }

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialSameTitle);

        expect(response.status).toBe(HttpStatus.CONFLICT);
    });

    it("POST /credentials => should return message for already use credential title input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const credentialData = await new CredentialsFactory().buildDBFaker(prisma, signUpData.id);
        const credentialSameTitle = {
            username: new CredentialsFactory().buildFaker().username,
            title: credentialData.title,
            url: new CredentialsFactory().buildFaker().url,
            password: new CredentialsFactory().buildFaker().password,
        }

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialSameTitle);

        expect(response.text).toContain(`O titulo ${credentialData.title} já está sendo usado`);
    });

    //fazer teste de sucesso de adição de credential
    it("POST /credentials => should return status code 201 for created credential in database", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);

        const credentialData = {
            ...new CredentialsFactory().buildFaker(),
            user_id: signUpData.id
        }

        const response = await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        expect(response.status).toBe(HttpStatus.CREATED);
    });

    it("POST /credentials => sucessful created credential in database", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);

        const credentialData = {
            ...new CredentialsFactory().buildFaker(),
            user_id: signUpData.id
        }

        await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        const credentialExists = await prisma.credential.findFirst({
            where: {
                user_id: credentialData.user_id,
                title: credentialData.title
            }
        })

        expect(credentialExists).toEqual({
            ...credentialData,
            id: expect.any(Number),
            atTime: expect.any(Date),
            password: expect.any(String)
        });
    });

    it("POST /credentials => sucessful created crypted password credential in database", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);

        const credentialData = {
            ...new CredentialsFactory().buildFaker(),
            user_id: signUpData.id
        }

        await request(app.getHttpServer())
            .post(CREATE_CREDENTIALS_ROUTE)
            .send(credentialData);

        const credentialExists = await prisma.credential.findFirst({
            where: {
                user_id: credentialData.user_id,
                title: credentialData.title
            }
        })

        expect(credentialExists.password).toHaveLength(222);
    });

    //fazer teste de duas pessoas com o mesmo titulo

    //fazer teste com key a mais
});
