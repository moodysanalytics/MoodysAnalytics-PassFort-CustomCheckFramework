import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CheckErrorTypes,
  ErrorResponse,
  IntegrationError,
} from '../types/error_response';
import { ValidationException } from 'src/types/app_exception';
import { Decision } from 'src/types/check_response';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // OK per Passfort guidelines
    response.status(HttpStatus.OK);

    const errors: IntegrationError[] = [];
    let result = null;
    let providerData = null;

    switch (exception.message) {
      case CheckErrorTypes.MISSING_QUERY_PARAMS:
        errors.push({
          type: CheckErrorTypes.MISSING_QUERY_PARAMS,
          message: 'Missing required query parameter',
        });
        response.status(HttpStatus.BAD_REQUEST);
        break;

      case CheckErrorTypes.UNSUPPORTED_DEMO_RESULT:
        errors.push({
          type: CheckErrorTypes.UNSUPPORTED_DEMO_RESULT,
          message: 'Demo result is not supported.',
        });
        break;

      // Regular validation error
      default:
        errors.push({
          type: CheckErrorTypes.INVALID_CHECK_INPUT,
          message:
            exception.message ?? 'Invalid or missing input data provided',
        });
        providerData = 'Insufficient company data provided to perform a check.';
        result = {
          decision: Decision.ERROR,
          summary: `${providerData} Please contact support for more information.`,
        };
        break;
    }

    const warnings = [];
    this.logger.error(exception.message, exception.stack);
    response.json(new ErrorResponse(errors, warnings, providerData, result));
  }
}
