import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import * as config from 'config';

const port = config.get<string>('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });
  app.enableCors();
  await app.listen(parseInt(port, 10) || 3000);
}
bootstrap();
