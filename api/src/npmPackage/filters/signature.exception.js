import { ErrorResponse } from '../../types/error_response';

/* 
it's clumsy that this accepts a string, perhaps this function should not handle all three of the signature error types?
then it would be up to caller to sort between which excpetion type is called...
*/
export const handleSignatureException = (exception) => {
    let statusCode = 400; // Default status code for BadRequestException
    const errors = [{
      type: "SIGNATURE_ERROR", // Assuming "SIGNATURE_ERROR" is a constant in the project
      message: exception.message,
    }];
    const warnings = []; // Assuming there are scenarios where warnings might be added
  
    if (exception === 'UnauthorizedException') {
      statusCode = 404;
    } else if (exception === 'ForbiddenException') {
      statusCode = 401;
    }
  
    return {
      statusCode,
      errorResponse: new ErrorResponse(errors, warnings),
    };
  }