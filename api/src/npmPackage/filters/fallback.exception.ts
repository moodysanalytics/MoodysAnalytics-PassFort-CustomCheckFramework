import { ErrorResponse, IntegrationError, CheckErrorTypes } from '../../types/error_response';

export const handleFallbackException = () => {
    let statusCode = 200; // Http OK status code (PassFort guidance)
    
    const errors: IntegrationError[] = [
        {
          type: CheckErrorTypes.UNKNOWN_ERROR,
          message: 'Unknown error occurred',
        },
      ];
    
      const warnings = [];
  
    return {
      statusCode,
      errorResponse: new ErrorResponse(errors, warnings),
    };
  }