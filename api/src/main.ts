import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception';
import { SignatureExceptionFilter } from './filters/signature-exception';
import { FallbackExceptionFilter } from './filters/fallback_exception';
//import { ValidationExceptionFilter } from './filters/validation-exception';
import { AppExceptionFilter } from './filters/app-exception.filter';
import appConfig from './config/app.config';
import { ConfigType } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });
  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  app.setGlobalPrefix(config.urlPrefix || '');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new AppExceptionFilter(),
    //new ValidationExceptionFilter(),
    new SignatureExceptionFilter(),
  );
  await app.listen(config.port);
}

bootstrap();
