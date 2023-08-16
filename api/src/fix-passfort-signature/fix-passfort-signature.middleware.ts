import { Injectable, NestMiddleware } from '@nestjs/common';
const fixSignature = (signature: string) => {
  if (signature.startsWith('Signature ')) {
    // Check if trailing " is missing and add it if so
    if (!signature.endsWith('"')) {
      signature += '"';
    }
  }
  return signature;
};
@Injectable()
export class FixPassFortSignatureMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.headers.authorization) {
      if (Array.isArray(req.headers.authorization)) {
        req.headers.authorization = req.headers.authorization.map(fixSignature);
      } else if (req.headers.authorization) {
        req.headers.authorization = fixSignature(req.headers.authorization);
      }
    }
    next();
  }
}
