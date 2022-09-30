import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { error } from 'console';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //  logger: ['error', 'warn', 'debug'],
  });
  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
// group validator can be used to validate multiple values in a single group
