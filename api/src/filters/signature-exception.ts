import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { handleSignatureException } from '../npmPackage/filters/signature.exception';

@Catch(UnauthorizedException, BadRequestException, ForbiddenException)
export class SignatureExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    /* 
    need some logic here that converts the above Nest exceptions into generic exceptions so that the modularized 
    package logic can determine the appropriate status code independent of the framework being used
    */

    const exceptionType = 'BadRequestException'; // or 'UnauthorizedException' or 'ForbiddenException
    if (exception instanceof UnauthorizedException) {
      exception = 'UnauthorizedException';
    } else if (exception instanceof ForbiddenException) {
      exception = 'ForbiddenException';
    }
    
    const { statusCode, errorResponse } = handleSignatureException(exception);

    response.status(statusCode).json(errorResponse);
  }
}
