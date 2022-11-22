import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 10000000000000000000 }),

  );
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
