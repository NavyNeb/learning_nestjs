import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class MissingNameExceptionFilterFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    //Check if the exception is related to missing name property
    if ( exception.getStatus() === HttpStatus.BAD_REQUEST && exception.message.includes("name") ) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Missing name property in the request",
        error: exception.message
      });
      return;
    }

    //If not related to missing name, pass it on
    throw exception;
  }
}
