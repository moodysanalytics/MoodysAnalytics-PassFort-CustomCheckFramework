import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PassFortIntegrationService } from '../services/passfort-integration.service.js';
import 'reflect-metadata';
import 'es6-shim';
import { CheckRequest } from '../types/check_request.js';
import { CheckResponse } from '../types/check_response.js';
import {
  SignResponseInterceptor,
  Signed,
  VerifySignatureGuard,
} from '@holmesmr/nest-http-sig';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service.js';
import { ConfigType } from '@nestjs/config';
import appConfig from '../config/app.config.js';
import { validateIFrameSignatureHelper } from '../utils/iframe-signature.helpers.js';
import { signAndVerify } from '../utils/debug.helpers.js';

@UseGuards(VerifySignatureGuard)
@UseInterceptors(SignResponseInterceptor)
@Controller()
export class PassFortIntegrationController {
  @Inject(PassFortIntegrationService)
  private passFortIntegrationService: PassFortIntegrationService;
  @Inject(AuthService) private authService: AuthService;

  @Get('/')
  getMetadata() {
    return this.passFortIntegrationService.getMetadata();
  }

  @Signed({
    verifyRequest: signAndVerify(),
    signResponse: signAndVerify(),
  })
  @Get('/config')
  getConfig() {
    return this.passFortIntegrationService.getConfig();
  }

  @Signed({
    verifyRequest: signAndVerify(),
    signResponse: signAndVerify(),
  })
  @Post('/checks')
  async check(
    @Req() req: Request,
    @Body() checkRequest: CheckRequest,
  ): Promise<CheckResponse> {
    return this.passFortIntegrationService.runChecks(req, checkRequest);
  }

  @Get('/validateSignature/:id')
  validateIFrameSignature(
    @Req() req: Request,
    @Query('version') version: number,
    @Query('valid_until') valid_until: number,
    @Query('auditee_id') auditee_id: string,
    @Query('signature') signature: string,
    @Param('id') id: string,
  ) {
    // return validateIFrameSignatureHelper(
    //   req,
    //   version,
    //   valid_until,
    //   auditee_id,
    //   signature,
    //   id,
    //   this.authService,
    // );
    return this.passFortIntegrationService.runIFrameValidation(
      req,
      version,
      valid_until,
      auditee_id,
      signature,
      id,
    );
  }
}
