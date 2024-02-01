import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import {
  CheckErrorTypes,
  ErrorResponse,
  IntegrationError,
} from '../types/error_response';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(FallbackExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors: IntegrationError[] = [
      {
        type: CheckErrorTypes.UNKNOWN_ERROR,
        message: 'Unknown error occurred',
      },
    ];

    const warnings = [];

    this.logger.error({ msg: 'Uncaught exception raised', exception });

    response.status(HttpStatus.OK);
    response.json(new ErrorResponse(errors, warnings));
  }
}
