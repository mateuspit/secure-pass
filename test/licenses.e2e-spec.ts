import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from "../src/prisma/prisma.service"

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
    await app.init();
});
afterAll(async () => {
    await app.close();
});

describe('LicenseController (e2e)', () => {

    it('GET /health', () => {
        return request(app.getHttpServer())
            .get('/licenses/health')
            .expect(200)
            .expect(`licenses okay!`);
    });
});
