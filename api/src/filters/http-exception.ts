import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CheckErrorTypes,
  ErrorResponse,
  IntegrationError,
} from '../types/error_response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors: IntegrationError[] = [
      {
        type: CheckErrorTypes.PROVIDER_CONNECTION,
        message: 'Http error occurred',
      },
    ];

    const warnings = [];

    response.status(HttpStatus.OK);
    response.json(new ErrorResponse(errors, warnings));
  }
}
