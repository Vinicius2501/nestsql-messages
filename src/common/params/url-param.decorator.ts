import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UrlParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const httpCtx = ctx.switchToHttp();
    const request = httpCtx.getRequest();
    return request.url;
  },
);
