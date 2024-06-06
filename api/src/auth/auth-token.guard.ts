import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedAppException, verifyAsync } from '@moodys/custom-check-helpers';

@Injectable()
export class AuthTokenGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const debug: string = process.env.DEBUG;

    if (debug === 'true') {
      return true;
    } else {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      try {
        const payload = await verifyAsync(token, process.env.JWT_SECRET);
        // We're assigning the payload to the request object here
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
    if (type !== 'Bearer') {
      throw new UnauthorizedAppException('Missing token in header of request');
    }
    return token;
  }
}
