import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useSwagger } from './swagger/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useSwagger(app);
  app.enableCors();
  await app.listen(process.env.PORT, process.env.HOST);
  console.log(
    `Server is listening on http://${process.env.HOST}:${process.env.PORT}`,
  );
}
bootstrap();
