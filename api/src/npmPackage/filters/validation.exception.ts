import {
    CheckErrorTypes,
    ErrorResponse,
    IntegrationError
  } from '../../types/error_response';
  import { Decision } from 'src/types/check_response';


export const handleValidationException = (exception) => {
    const errors: IntegrationError[] = [];
    let result = null;
    let providerData = null;
    let statusCode = 200; // Default status code is http OK
  
    switch (exception.message) {
      case CheckErrorTypes.MISSING_QUERY_PARAMS:
        errors.push({
          type: CheckErrorTypes.MISSING_QUERY_PARAMS,
          message: 'Missing required query parameter',
        });
        statusCode = 400; // Bad request
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
  

      return { statusCode, errorResponse: new ErrorResponse(errors, warnings, providerData, result) };
  }