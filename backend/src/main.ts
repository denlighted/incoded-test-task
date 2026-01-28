import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'https://incoded-test-task-3.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Set-Cookie', 'Content-Disposition'],
    allowedHeaders: ['Authorization', 'X-Api-Key', 'Content-type']
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
