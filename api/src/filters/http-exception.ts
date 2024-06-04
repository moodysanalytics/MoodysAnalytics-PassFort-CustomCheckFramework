import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { handleAppException } from '../npmPackage/filters/app_exception.js';
import { HttpAppException } from '../types/app_exception.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const formattedException = new HttpAppException(exception.message);

    const { statusCode, errorResponse } = handleAppException(formattedException);
    response.status(statusCode).json(errorResponse)
  }
}
