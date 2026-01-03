import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class MyExceptionFilter<
  T extends HttpException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const error =
      typeof exception.getResponse() === 'string'
        ? {
            message: exception.getResponse(),
          }
        : exception.getResponse();

    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      error,
    });
  }
}
