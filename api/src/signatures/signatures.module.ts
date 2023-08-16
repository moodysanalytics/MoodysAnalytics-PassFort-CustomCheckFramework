import { Module } from '@nestjs/common';
import { signatureProvider, SIGNATURE_INST } from '@holmesmr/nest-http-sig';
import { signatureConfigProvider } from './config.provider';
import { keyLookupProvider } from './key-lookup.provider';
import { ConfigModule } from '@nestjs/config';
import signaturesConfig from '../config/signatures.config';
@Module({
  imports: [ConfigModule.forFeature(signaturesConfig)],
  providers: [signatureProvider, signatureConfigProvider, keyLookupProvider],
  exports: [SIGNATURE_INST],
})
export class SignaturesModule {}
