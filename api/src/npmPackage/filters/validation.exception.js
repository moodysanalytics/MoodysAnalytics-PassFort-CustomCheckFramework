import {
    CheckErrorTypes,
    ErrorResponse,
    IntegrationError,
  } from '../../types/error_response';


export const handleValidationException = (exception, response = null) => {
    const errors = [];
    let result = null;
    let providerData = null;
    let statusCode = HttpStatus.OK; // Default status code
  
    switch (exception.message) {
      case CheckErrorTypes.MISSING_QUERY_PARAMS:
        errors.push({
          type: CheckErrorTypes.MISSING_QUERY_PARAMS,
          message: 'Missing required query parameter',
        });
        statusCode = HttpStatus.BAD_REQUEST;
        break;
  
      case CheckErrorTypes.UNSUPPORTED_DEMO_RESULT:
        errors.push({
          type: CheckErrorTypes.UNSUPPORTED_DEMO_RESULT,
          message: 'Demo result is not supported.',
        });
        break;
  
      default:
        errors.push({
          type: CheckErrorTypes.INVALID_CHECK_INPUT,
          message: exception.message ?? 'Invalid or missing input data provided',
        });
        providerData = 'Insufficient company data provided to perform a check.';
        result = {
          decision: Decision.ERROR,
          summary: `${providerData} Please contact support for more information.`,
        };
        break;
    }
  
    const warnings = [];
  
    if (response) {
      response.status(statusCode).json(new ErrorResponse(errors, warnings, providerData, result));
    } else {
      return { statusCode, errorResponse: new ErrorResponse(errors, warnings, providerData, result) };
    }
  }