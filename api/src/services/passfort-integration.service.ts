import { Inject, Injectable } from '@nestjs/common';
import { CheckRequest } from '../types/check_request.js';
import { Request } from 'express';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';
import { ONE_TIME_CONFIG } from '../../static/config.js';
import { META_DATA } from '../../static/metadata.js';
import {
  getExternalUrl,
  decideCheckResult,
} from '../utils/pf-integration.helpers.js';
import { build_OTS_CC_CheckResponse, build_OTS_CC_ExternalResource, build_OTS_CC_Result, run_OTS_CC_DemoCheck } from '@moodys/custom-check-helpers';
import { ExternalResource, ResourceType, CheckResponse, PassFortWarning, Result } from '@moodys/custom-check-helpers';

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

      /*
      To properly validate your demo check, you'll need a url that 
      redirects to the correct desitination.
      */
     const demo_url: string = getExternalUrl('1');
      return run_OTS_CC_DemoCheck(checkRequest.demo_result, demo_url, process.env.CHECK_TYPE as ResourceType);
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

   const external_resources_arguments: ExternalResource = {
      type: process.env.CHECK_TYPE as ResourceType, // 'EMBED' or 'LINK'
      url: getExternalUrl(metadata.bvd_id), // the URL you'd like to embed or link out to
      id: 'The external_resource identifier',
      label: 'The label for your external resource',
    }

    /* 
    example_result is a placeholder for the decision and summary you'd return from your check.
    In a real integration, you'd make this decision based on the data you've gathered while 
    processing the check. 
    */
    const example_result: Result = decideCheckResult(checkRequest.provider_config, metadata);

    const provider_data: string = "This should be the structured JSON data returned by the data provider or a conversion of the data provider's response to allow Passfort to investigate any issues that arise with your integration.";
    const warnings: PassFortWarning[] = [];
    const errors: Error[] = []; 
    const external_resources = build_OTS_CC_ExternalResource(
      external_resources_arguments.type,
      external_resources_arguments.url,
      external_resources_arguments.id,
      external_resources_arguments.label
    ); 
    const result: Result = build_OTS_CC_Result(example_result.decision, example_result.summary);

    return build_OTS_CC_CheckResponse(result, warnings, errors, external_resources, provider_data); 
  }
}
