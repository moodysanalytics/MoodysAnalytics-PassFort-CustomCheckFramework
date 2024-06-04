import { Module } from '@nestjs/common';
import { signatureProvider, SIGNATURE_INST } from '@holmesmr/nest-http-sig';
import { signatureConfigProvider } from './config.provider.js';
import { keyLookupProvider } from './key-lookup.provider.js';
import { ConfigModule } from '@nestjs/config';
import signaturesConfig from '../config/signatures.config.js';
@Module({
  imports: [ConfigModule.forFeature(signaturesConfig)],
  providers: [signatureProvider, signatureConfigProvider, keyLookupProvider],
  exports: [SIGNATURE_INST],
})
export class SignaturesModule {}
