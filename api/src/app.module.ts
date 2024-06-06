import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassFortIntegrationController } from './controllers/passfort-integration.controller.js';
import { PassFortIntegrationService } from './services/passfort-integration.service.js';
import { SignaturesModule } from './signatures/signatures.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config.js';
import { PassFortIFrameController } from './controllers/passfort-iframe.controller.js';
import { PassFortIFrameService } from './services/passfort-iframe.service.js';

const rootConfig = ConfigModule.forRoot({
  load: [appConfig],
});

@Module({
  imports: [SignaturesModule, AuthModule, rootConfig],
  controllers: [PassFortIntegrationController, PassFortIFrameController],
  providers: [PassFortIntegrationService, PassFortIFrameService],
})

export class AppModule {}
