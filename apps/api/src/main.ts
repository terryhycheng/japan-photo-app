import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Photo Contest APIs')
    .setDescription('The photo contest API documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL', '*'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}

bootstrap();
