import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../types/app_exception';
import { ErrorResponse } from '../types/error_response';
import { IntegrationError } from '../types/error_response';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors: IntegrationError[] = [
      {
        type: exception.passfortErrorCode,
        message: exception.message,
      },
    ];

    const warnings = [];

    response.status(exception.statusCode);
    response.json(new ErrorResponse(errors, warnings));
  }
}
