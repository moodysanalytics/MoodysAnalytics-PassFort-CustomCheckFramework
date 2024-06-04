// import { AppException } from '../types/app_exception.types.js';
// import { ErrorResponse, IntegrationError } from '../types/error_response.types.js';

// export const handleAppException = (exception: AppException) => {
//     const errors: IntegrationError[] = [{
//       type: exception.passfortErrorCode,
//       message: exception.message,
//     }];
//     const warnings = [];
  
//     return {
//       statusCode: exception.statusCode,
//       errorResponse: new ErrorResponse(errors, warnings),
//     };
//   }