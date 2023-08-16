import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../types/error_response';
import { CheckErrorTypes } from '../types/error_response';
import { IntegrationError } from '../types/error_response';

@Catch(UnauthorizedException, BadRequestException, ForbiddenException)
export class SignatureExceptionFilter implements ExceptionFilter {
  catch(
    exception: UnauthorizedException | BadRequestException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors: IntegrationError[] = [
      {
        type: CheckErrorTypes.SIGNATURE_ERROR,
        message: exception.message,
      },
    ];

    const warnings = [];

    if (exception instanceof UnauthorizedException) {
      response.status(404);
      response.json(new ErrorResponse(errors, warnings));
    } else if (exception instanceof ForbiddenException) {
      response.status(401);
      response.json(new ErrorResponse(errors, warnings));
    } else {
      response.status(400);
      response.json(new ErrorResponse(errors, warnings));
    }
  }
}
