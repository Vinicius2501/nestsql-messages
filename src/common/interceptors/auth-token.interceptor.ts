import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();
      const authToken = request.headers.authorization.split(' ')[1];

      if (!authToken) {
        throw new Error('No auth token provided');
      }
      return next.handle();
    } catch (error) {
      throw new BadRequestException('Invalid or missing authorization token');
    }
  }
}
