import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(401).send('Unauthorized: No Authorization header provided');
      return;
    }

    req['user'] = {
      id: 1,
      name: 'Vinicius Vasconcelos',
      prefix: 'VV',
      role: 'user',
    };

    next();
  }
}
