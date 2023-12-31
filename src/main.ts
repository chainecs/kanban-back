import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //enable cors
  app.useGlobalPipes(new ValidationPipe()); //validate post request from dto
  await app.listen(8888);
}
bootstrap();
