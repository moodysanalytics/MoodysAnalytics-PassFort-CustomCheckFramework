import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.js';
import { SignatureExceptionFilter } from './filters/signature-exception.js';
import { FallbackExceptionFilter } from './filters/fallback_exception.js';
import { AppExceptionFilter } from './filters/app-exception.filter.js';
import appConfig from './config/app.config.js';
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
    new SignatureExceptionFilter(),
  );
  await app.listen(config.port);
}

bootstrap();
