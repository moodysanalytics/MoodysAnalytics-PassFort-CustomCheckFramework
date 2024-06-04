import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { handleAppException, AppException } from "@moodys/custom-check-helpers";

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();


    const { statusCode, errorResponse } = handleAppException(exception);
    response.status(statusCode).json(errorResponse)
  }
}
