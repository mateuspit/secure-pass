import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from "../src/prisma/prisma.service";
import { SignUpDataFactory } from "./factory/users.factory";

let app: INestApplication;
let prisma: PrismaService;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(PrismaService)
        .useValue(prisma)
        .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    await app.init();
});
afterAll(async () => {
    await app.close();
});

const PASS_WO_MIN_LENGTH = new SignUpDataFactory().buildFaker().password.slice(0, -1);
const PASS_WO_MIN_NUMBER = `Senh@asdfg`;
const PASS_WO_MIN_LOWERCASE = `S3NH@56789`;
const PASS_WO_MIN_UPPERCASE = `s3nh@56789`;
const PASS_WO_MIN_SYMBOLS = `s3nhA56789`;
const SIGN_UP_ROUTE = `/auth/sign-up`;
const SIGN_IN_ROUTE = `/auth/sign-in`;
const HEALTH_ROUTE = `/auth/health`;
const NOT_DB_EMAIL = new SignUpDataFactory().buildFaker().email;

describe('AuthController (e2e)', () => {
    it('GET /health', async () => {
        const { status, text } = await request(app.getHttpServer())
            .get(HEALTH_ROUTE);

        expect(status).toBe(200);
        expect(text).toBe(`auth okay!`);
    });

    it("POST /auth/sign-up => should successfully sign up a user and return status code 201", async () => {
        const signUpData = new SignUpDataFactory().buildFaker();

        const response = await request(app.getHttpServer())
            .post(SIGN_UP_ROUTE)
            .send(signUpData);


        expect(response.status).toBe(HttpStatus.CREATED);

        const userData = await prisma.user.findFirst({
            where: { email: signUpData.email }
        });

        expect(userData).toBeTruthy();
        expect(userData.password).toHaveLength(60);
        expect(userData.email).toBe(signUpData.email);
    });

    it("POST /auth/sign-up => should return status code 409 for conflict sign-up email input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);

        const response = await request(app.getHttpServer())
            .post(SIGN_UP_ROUTE)
            .send(signUpData);

        expect(response.status).toBe(HttpStatus.CONFLICT);
    });

    it("POST /auth/sign-up => should return a message indicating email conflict", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);

        const response = await request(app.getHttpServer())
            .post(SIGN_UP_ROUTE)
            .send(signUpData);

        expect(response.text).toContain(`E-mail ${signUpData.email} já está em uso!`);
    });

    it("POST /auth/sign-up => should return status code 400 for wrong sign-up password input data", async () => {
        const scenarios = [
            { password: PASS_WO_MIN_LENGTH },
            { password: PASS_WO_MIN_NUMBER },
            { password: PASS_WO_MIN_LOWERCASE },
            { password: PASS_WO_MIN_UPPERCASE },
            { password: PASS_WO_MIN_SYMBOLS },
        ];

        for (const scenario of scenarios) {
            const signUpData = new SignUpDataFactory().buildFaker();
            signUpData.password = scenario.password;

            const response = await request(app.getHttpServer())
                .post(SIGN_UP_ROUTE)
                .send(signUpData);

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-up => should return status code 400 for non-string sign-up password input data", async () => {
        const signUpData = new SignUpDataFactory().buildFaker();

        const scenarios = [
            { password: 0 },
            { password: true },
            { password: false },
            { password: null },
            { password: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(SIGN_UP_ROUTE)
                .send({
                    email: signUpData.email,
                    password: scenario.password
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-up => should return status code 400 for non-string sign-up email input data", async () => {
        const signUpData = new SignUpDataFactory().buildFaker();

        const scenarios = [
            { email: 0 },
            { email: true },
            { email: false },
            { email: null },
            { email: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(SIGN_UP_ROUTE)
                .send({
                    password: signUpData.password,
                    email: scenario.email
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-in => should successfully sign in and return status code 201 and token", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const signInData = {
            email: signUpData.email,
            password: signUpData.password
        }

        const response = await request(app.getHttpServer())
            .post(SIGN_IN_ROUTE)
            .send(signInData);

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body.token).toBeTruthy();
    });

    it("POST /auth/sign-in => should create a session", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const signInData = {
            email: signUpData.email,
            password: signUpData.password
        }

        const response = await request(app.getHttpServer())
            .post(SIGN_IN_ROUTE)
            .send(signInData);

        const sessionExist = await prisma.session.findFirst({
            where: {
                token: response.body.token
            }
        })

        expect(sessionExist.token).toBe(response.body.token);
        expect(sessionExist).toBeTruthy();
    });

    it("POST /auth/sign-in => should return status code 400 for wrong sign-in password input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const signInData = {
            email: signUpData.email
        }

        const scenarios = [
            { password: PASS_WO_MIN_LENGTH },
            { password: PASS_WO_MIN_NUMBER },
            { password: PASS_WO_MIN_LOWERCASE },
            { password: PASS_WO_MIN_UPPERCASE },
            { password: PASS_WO_MIN_SYMBOLS },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(SIGN_IN_ROUTE)
                .send({
                    email: signInData.email,
                    password: scenario.password
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-in => should return status code 400 for non-string sign-in password input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const signInData = {
            email: signUpData.email
        }

        const scenarios = [
            { password: 0 },
            { password: true },
            { password: false },
            { password: null },
            { password: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(SIGN_IN_ROUTE)
                .send({
                    email: signInData.email,
                    password: scenario.password
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-in => should return status code 400 for non-string sign-in email input data", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const signInData = {
            password: signUpData.password
        }

        const scenarios = [
            { email: 0 },
            { email: true },
            { email: false },
            { email: null },
            { email: undefined },
        ];

        for (const scenario of scenarios) {
            const response = await request(app.getHttpServer())
                .post(SIGN_IN_ROUTE)
                .send({
                    password: signInData.password,
                    email: scenario.email
                });

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("POST /auth/sign-in => should return status code 401 for no sign-in email data in DB", async () => {
        const invalidCredentials = {
            email: NOT_DB_EMAIL,
            password: new SignUpDataFactory().buildFaker().password
        };

        const response = await request(app.getHttpServer())
            .post(SIGN_IN_ROUTE)
            .send(invalidCredentials);

        expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it("POST /auth/sign-in => should return a message indicating email unauthorized in sign in", async () => {
        const invalidCredentials = {
            email: NOT_DB_EMAIL,
            password: new SignUpDataFactory().buildFaker().password
        };

        const response = await request(app.getHttpServer())
            .post(SIGN_IN_ROUTE)
            .send(invalidCredentials);

        expect(response.text).toContain(`E-mail ${NOT_DB_EMAIL} não cadastrado!`);
    });

    it("POST /auth/sign-in => should return a message indicating wrong password in sign in", async () => {
        const signUpData = await new SignUpDataFactory().buildDBFaker(prisma);
        const invalidCredentials = {
            email: signUpData.email,
            password: new SignUpDataFactory().buildFaker().password + new SignUpDataFactory().buildFaker().password
        };

        const response = await request(app.getHttpServer())
            .post(SIGN_IN_ROUTE)
            .send(invalidCredentials);

        expect(response.text).toContain(`Senha incorreta!`);
    });
});
