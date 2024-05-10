import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new NotFoundException('Token not found, Cannot Proceed');
    }

    try {
      const decode = jwt.verify(token, this.JWT_SECRET) as JwtPayload;

      req.user = {
        approved: true,
        email: decode.email,
        id: decode.id,
      };

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT', error);
    }
  }
}
