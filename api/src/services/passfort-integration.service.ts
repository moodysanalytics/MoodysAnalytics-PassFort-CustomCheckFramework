import { Inject, Injectable } from '@nestjs/common';
import { CheckRequest } from '../types/check_request.js';
import { CheckResponse } from '../types/check_response.js';
import { Request } from 'express';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';
import { ONE_TIME_CONFIG } from '../../static/config.js';
import { META_DATA } from '../../static/metadata.js';
import {
  runDemoCheck,
  createResponseObject,
} from '../utils/pf-integration.helpers.js';

@Injectable()
export class PassFortIntegrationService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  getMetadata() {
    return META_DATA;
  }

  getConfig() {
    return ONE_TIME_CONFIG;
  }

  async runChecks(req: Request, checkRequest: CheckRequest) {
    if (checkRequest.demo_result) {
      return runDemoCheck(checkRequest.demo_result);
    } else {
      return this.runCheck(checkRequest);
    }
  }

  async runCheck(checkRequest: CheckRequest): Promise<CheckResponse> {
    const metadata = checkRequest.check_input.metadata;

    /* 
    call whichever functions you need to gather,
    format, and save data for your check.
    */

    return createResponseObject(metadata, checkRequest);
  }
}
