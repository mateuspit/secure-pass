import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const port = process.env.PORT || 3000;


    const config = new DocumentBuilder()
        .setTitle("Secure pass - password managment")
        .setDescription(`Navigating the internet can be both enjoyable and perilous. Studies, both national and international, reveal a relentless rise in online scams. This raises the question: how can we protect ourselves? There are various methods, starting with the use of distinct and secure passwords. A secure password should include a mix of characters and numbers and, the longer it is, the better. However, how can we remember lengthy, semantically meaningless passwords? This is where password managers come in! With them, you create just one "master" password, keeping all your other passwords securely stored. So, when needed, you only have to recall the "master" password (which, of course, should also be secure).`)
        .setVersion("Beta")
        .addTag("endpoints")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(port, () => {
        console.log("Server is up and running on port: " + port);
    });
}
bootstrap();
