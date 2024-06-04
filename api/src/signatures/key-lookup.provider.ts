import * as crypto from 'crypto';
import {
  DigestAlgorithm,
  HmacAlgorithm,
  KeyLookupParams,
  SIGNATURE_KEY_LOOKUP,
  SignatureAlgorithm,
} from '@holmesmr/nest-http-sig';
import signaturesConfig from '../config/signatures.config.js';
import { ConfigType } from '@nestjs/config';
const createSymmetricKey = ({
  value,
  encoding,
}: {
  value: string;
  encoding: 'hex' | 'base64';
}) => crypto.createSecretKey(Buffer.from(value, encoding)); 
export const keyLookupProvider = {
  provide: SIGNATURE_KEY_LOOKUP,
  useFactory: (
    sigConfig: ConfigType<typeof signaturesConfig>,
  ): KeyLookupParams => {
    const key = createSymmetricKey({
      encoding: 'base64',
      value: sigConfig.secretKeyBase64,
    });
    return {
      keyId: sigConfig.secretKeyId,
      signatureAlgorithm: SignatureAlgorithm.HS2019,
      digest: DigestAlgorithm.SHA256,
      algorithm: HmacAlgorithm.SHA256,
      key,
    };
  },
  inject: [signaturesConfig.KEY],
};
