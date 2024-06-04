import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestAppException, ForbiddenAppException, UnauthorizedAppException } from '../npmPackage/types/app_exception.types.js';
import { handleAppException } from '../npmPackage/filters/app_exception.js';

@Catch(UnauthorizedAppException, BadRequestAppException, ForbiddenException)
export class SignatureExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    /* 
    Becuase we are using { VerifySignatureGuard } from '@holmesmr/nest-http-sig' to protect our routes,
    we throw a nestjs UnauthorizedException when the signature is invalid.

    Ideally we would use the express implmentation of @holmesmr/http-sig, but for expediency I am adding the below conditional
    to catch and convert that exception into one of our modularized excpetion classes. 
    */

    if (exception instanceof ForbiddenException) {
        exception = new ForbiddenAppException();
    }
    
    const { statusCode, errorResponse } = handleAppException(exception);

    response.status(statusCode).json(errorResponse);
  }
}
