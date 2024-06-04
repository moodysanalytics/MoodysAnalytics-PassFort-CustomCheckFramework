import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { handleAppException, UnknownAppException } from "@moodys/custom-check-helpers";

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

