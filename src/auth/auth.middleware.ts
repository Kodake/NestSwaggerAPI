import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Skip authorization for the Swagger UI route
    if (req.url.startsWith('/api')) {
      next();
      return;
    }

    // Perform your authorization logic here
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      if (token === process.env.TOKEN) {
        console.log(token);

        // Authorized
        next();
        return;
      }
    }

    // Unauthorized
    res.status(401).json({ errorCode: 401, message: 'Unauthorized' });
  }
}
