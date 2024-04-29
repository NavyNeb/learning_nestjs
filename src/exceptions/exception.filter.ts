/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class InvalidNameFormatExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      status === HttpStatus.BAD_REQUEST &&
      /[^a-zA-Z]/.test(request.body?.name)
    ) {
      response.status(status).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Name must only contain letters and spaces',
        error: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    //If not related to name format, pass it on
    throw exception;
  }

}
