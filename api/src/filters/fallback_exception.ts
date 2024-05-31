import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { handleAppException } from 'src/npmPackage/filters/app_exception';
import { UnknownAppException } from 'src/npmPackage/types/app_exception.types';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(FallbackExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error({ msg: 'Uncaught exception raised', exception });

    const formattedException = new UnknownAppException(exception.message);

    const { statusCode, errorResponse } = handleAppException(formattedException);
    response.status(statusCode).json(errorResponse)
  }
}

