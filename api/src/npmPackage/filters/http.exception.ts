import { ErrorResponse, IntegrationError, CheckErrorTypes } from '../../types/error_response';

export const handleHTTPException = () => {
    let statusCode = 200; // Http OK status code (PassFort guidance)
    
    const errors: IntegrationError[] = [
        {
          type: CheckErrorTypes.PROVIDER_CONNECTION,
          message: 'Http error occurred',
        },
      ];
  
      const warnings = [];
  
    return {
      statusCode,
      errorResponse: new ErrorResponse(errors, warnings),
    };
  }