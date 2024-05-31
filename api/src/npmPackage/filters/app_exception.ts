import { AppException } from '../types/app_exception.types';
import { ErrorResponse, IntegrationError } from '../types/error_response.types';

export const handleAppException = (exception: AppException) => {
    const errors: IntegrationError[] = [{
      type: exception.passfortErrorCode,
      message: exception.message,
    }];
    const warnings = [];
  
    return {
      statusCode: exception.statusCode,
      errorResponse: new ErrorResponse(errors, warnings),
    };
  }