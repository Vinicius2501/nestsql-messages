import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { finalize } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();

    //await new Promise((resolve) => setTimeout(resolve, 3000)); // Simula una demora de 3 segundos

    return next.handle().pipe(
      finalize(() => {
        console.log('Request processed in', Date.now() - now, 'ms');
      }),
    );
  }
}
