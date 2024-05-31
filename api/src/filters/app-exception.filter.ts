import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../types/app_exception';
import { handleAppException } from 'src/npmPackage/filters/app_exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, errorResponse } = handleAppException(exception);
    response.status(statusCode).json(errorResponse)
  }
}
