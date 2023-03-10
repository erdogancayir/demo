import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

export let app: INestApplication;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS, bir web sayfasının bir sunucudan kaynak almasına izin vermek için kullanılan bir mekanizmadır. (bu olmadan karsiya post gonderemiyoruz)
  await app.listen(3000);
}
bootstrap();
