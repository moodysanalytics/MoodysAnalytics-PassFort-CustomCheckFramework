import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(
    version,
    valid_until,
    auditee_id,
    signature,
    url,
    id,
  ) {
    this.validateIFrameSignature(
      version,
      valid_until,
      auditee_id,
      signature,
      url,
    );

    return {
      access_token: await this.jwtService.signAsync({
        sub: auditee_id,
        result_id: id,
      }),
    };
  }

  validateIFrameSignature(version, valid_until, auditee_id, signature, url) {
    if (
      version === undefined ||
      valid_until === undefined ||
      auditee_id === undefined ||
      signature === undefined
    ) {
      throw new BadRequestException('Missing required query parameter(s)');
    } else {
      const nowMilliseconds = Date.now();
      const validUntilMilliseconds = valid_until * 1000;

      if (nowMilliseconds > validUntilMilliseconds) {
        throw new UnauthorizedException('Signature has expired');
      } else {
        const key = process.env.INTEGRATION_SECRET_KEY;

        const bufferedSignature = Buffer.from(signature, 'base64');
        const secretKey = crypto.createSecretKey(key, 'base64');

        const hmac = crypto.createHmac('sha256', secretKey);
        hmac.update(url);

        const ourSignature = hmac.digest();

        let valid = false;
        try {
          valid = crypto.timingSafeEqual(bufferedSignature, ourSignature);
        } catch (e) {
          if (e instanceof RangeError) {
            throw new UnauthorizedException('Signature is invalid');
          }
          throw e;
        }

        if (!valid) {
          throw new UnauthorizedException('Signature is invalid');
        }
      }
    }
  }
}
