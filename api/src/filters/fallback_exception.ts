import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { handleFallbackException } from 'src/npmPackage/filters/fallback.exception';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(FallbackExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error({ msg: 'Uncaught exception raised', exception });

    const { statusCode, errorResponse } = handleFallbackException();
    response.status(statusCode).json(errorResponse)
  }
}
