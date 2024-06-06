import {
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { BadRequestAppException, CheckErrorTypes, UnauthorizedAppException, ValidationException } from '@moodys/custom-check-helpers';
import { generateSignedAccessToken, validateIFrameSignature } from '../npmPackage/formatters/validate_signature.helpers.js';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(
    version,
    valid_until,
    auditee_id,
    signature,
    url,
    fullUrl,
    id,
  ) {
    validateIFrameSignature(
      version,
      valid_until,
      auditee_id,
      signature,
      url,
      fullUrl
    );

    const secretKey = process.env.INTEGRATION_SECRET_KEY;
    const expirationTime = process.env.EXPIRATION_TIME;

    return {
      access_token: await generateSignedAccessToken(auditee_id, id, secretKey, expirationTime)
    };

    // return {
    //   access_token: await this.jwtService.signAsync({
    //     sub: auditee_id,
    //     result_id: id,
    //   }),
    // };
  }

  // validateIFrameSignature(version, valid_until, auditee_id, signature, url, fullUrl) {
  //   if (
  //     version === undefined ||
  //     valid_until === undefined ||
  //     auditee_id === undefined ||
  //     signature === undefined
  //   ) {
  //     throw new BadRequestAppException('Missing required query parameter(s)');
  //   } else {

  //     if (fullUrl !== url + '&signature=' + encodeURIComponent(signature)) {
  //       // If someone attempts to tack on paremeters after the signature, throw an error
  //       // Otherwise, a malicious user could alter the valid_until, auditee_id, or version parameters
  //       throw new ValidationException('Signature is invalid (tampering detected)', CheckErrorTypes.SIGNATURE_ERROR);
  //     }

  //     const nowMilliseconds = Date.now();
  //     const validUntilMilliseconds = valid_until * 1000;

  //     if (nowMilliseconds > validUntilMilliseconds) {
  //       throw new UnauthorizedAppException('Signature has expired');
  //     } else {
  //       const key = process.env.INTEGRATION_SECRET_KEY;

  //       const bufferedSignature = Buffer.from(signature, 'base64');
  //       const secretKey = crypto.createSecretKey(key, 'base64');

  //       const hmac = crypto.createHmac('sha256', secretKey);
  //       hmac.update(url);

  //       const ourSignature = hmac.digest();

  //       let valid = false;
  //       try {
  //         valid = crypto.timingSafeEqual(bufferedSignature, ourSignature);
  //       } catch (e) {
  //         if (e instanceof RangeError) {
  //           throw new UnauthorizedAppException('Signature is invalid');
  //         }
  //         throw e;
  //       }

  //       if (!valid) {
  //         throw new UnauthorizedAppException('Signature is invalid');
  //       }
  //     }
  //   }
  // }
}
