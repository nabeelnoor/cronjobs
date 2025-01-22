import { NestFactory } from '@nestjs/core';

import { Logger } from './lib';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn'],
  });
  app.enableCors();
  /**
   * Logger must be instantiated in atleast 1 module, so that its instance register in app object for resuability
   */
  app.useLogger(app.get(Logger));
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
