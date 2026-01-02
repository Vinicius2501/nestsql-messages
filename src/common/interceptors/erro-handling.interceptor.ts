import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import e from 'express';
import { catchError, Observable, throwError } from 'rxjs';

export class ErrorhandlingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        console.error('An error occurred:', err.message);
        return throwError(() => err);
      }),
    );
  }
}
