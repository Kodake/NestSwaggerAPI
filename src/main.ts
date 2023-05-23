import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply the authentication middleware to all routes

  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Todos API description')
    .setVersion('1.0')
    // .addTag('Hello World')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
