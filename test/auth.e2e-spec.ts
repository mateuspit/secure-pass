import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from "../src/prisma/prisma.service"
import { SignUpData } from './factory/auth.factory';

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

const PASS_WO_MIN_LENGTH = new SignUpData().buildFaker().password.slice(0, -1);
const PASS_WO_MIN_NUMBER = `Senh@asdfg`;
const PASS_WO_MIN_LOWERCASE = `S3NH@56789`;
const PASS_WO_MIN_UPPERCASE = `s3nh@56789`;
const PASS_WO_MIN_SYMBOLS = `s3nhA56789`;
const SIGN_UP_ROUTE = `/auth/sign-up`;

describe('AuthController (e2e)', () => {
    it('GET /health', async () => {
        const { status, text } = await request(app.getHttpServer())
            .get('/auth/health');

        expect(status).toBe(200);
        expect(text).toBe(`auth okay!`);
    });

    it("POST /auth/sign-up => should return status code 200; Sucess case", async () => {
        const signUpDate = new SignUpData().buildFaker();

        const { status } = await request(app.getHttpServer())
            .post(SIGN_UP_ROUTE)
            .send(signUpDate);

        expect(status).toBe(HttpStatus.CREATED);

        const userData = await prisma.user.findFirst({
            where: { email: signUpDate.email }
        });

        expect(userData.password).toHaveLength(60);
        expect(userData.email).toEqual(
            expect.stringContaining(signUpDate.email)
        );
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
            const signUpData = new SignUpData().buildFaker();
            signUpData.password = scenario.password;

            const response = await request(app.getHttpServer())
                .post(SIGN_UP_ROUTE)
                .send(signUpData);

            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });


    it("POST /auth/sign-up => should return status code 400 for non-string sign-up password input data", async () => {
        const signUpData = new SignUpData().buildFaker();

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
        const signUpData = new SignUpData().buildFaker();

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
});
