import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedAppException } from '../types/app_exception';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const debug: string = process.env.DEBUG;

    console.log('logging debug in auth token guard :', debug)

    if (debug === 'true') {
      return true;
    } else {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedAppException('Missing token in header of request');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['token'] = payload;
      } catch {
        throw new UnauthorizedAppException('Invalid token in header of request');
      }
      return true;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
