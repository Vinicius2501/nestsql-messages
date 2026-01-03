import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        this.cache.set(request.url, data);
        return data;
      }),
    );
  }
}
