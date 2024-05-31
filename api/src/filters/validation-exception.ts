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
import { ValidationException } from 'src/types/app_exception';
import { Decision } from 'src/types/check_response';
import { handleValidationException } from '../npmPackage/filters/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, exception.stack);
    
    const { statusCode, errorResponse } = handleValidationException(exception);
    response.status(statusCode).json(errorResponse)
  }
}
