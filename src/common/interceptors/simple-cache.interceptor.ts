import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log(`Cache hit for URL: ${url}`);
      return of(this.cache.get(url));
    }

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula una demora de 3 segundos

    return next.handle().pipe(
      tap((response) => {
        this.cache.set(url, response);
        console.log(`Response cached for URL: ${url}`);
      }),
    );
  }
}
