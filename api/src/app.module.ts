import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassFortIntegrationController } from './controllers/passfort-integration.controller';
import { PassFortIntegrationService } from './services/passfort-integration.service';
import { SignaturesModule } from './signatures/signatures.module';
import { FixPassFortSignatureMiddleware } from './fix-passfort-signature/fix-passfort-signature.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { PassFortIFrameController } from './controllers/passfort-iframe.controller';
import { PassFortIFrameService } from './services/passfort-iframe.service';

const rootConfig = ConfigModule.forRoot({
  load: [appConfig],
});

@Module({
  imports: [SignaturesModule, AuthModule, rootConfig],
  controllers: [PassFortIntegrationController, PassFortIFrameController],
  providers: [PassFortIntegrationService, PassFortIFrameService],
})
// do we still need this "FixPassFortSignatureMiddleware"
export class AppModule {}
