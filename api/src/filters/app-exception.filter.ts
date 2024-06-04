import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../types/app_exception.js';
import { handleAppException } from '../npmPackage/filters/app_exception.js';
import * as mod from "@moodys/custom-check-helpers";

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();


    console.log(mod.test('hello world'));

    const { statusCode, errorResponse } = handleAppException(exception);
    response.status(statusCode).json(errorResponse)
  }
}
