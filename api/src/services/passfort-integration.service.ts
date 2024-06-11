import { Inject, Injectable } from '@nestjs/common';
// import { CheckRequest } from '../types/check_request.js';
import { Request } from 'express';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';
import {
  getExternalUrl,
  decideCheckResult,
} from '../utils/pf-integration.helpers.js';
import { build_OTS_CC_CheckResponse, build_OTS_CC_ExternalResource, build_OTS_CC_Result, run_OTS_CC_DemoCheck, ExternalResource, ResourceType, OTS_CC_CheckResponse, PassFortWarning, Result, formatUrlsForSignature, generateRedirectHTML, generateSignedAccessToken, validateIFrameSignature, FormattedUrls, metadataFactory, OTS_CC_CheckConfigType, OTS_CC_CheckRequestType } from '@moodys/custom-check-helpers';


@Injectable()
export class PassFortIntegrationService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  getMetadata() {
    return metadataFactory('Your provider name here.');
  }

  getConfig() {
    const config: OTS_CC_CheckConfigType = {
      check_type: 'COMPANY_CUSTOM',
      check_template: {
        timeout: 60,
        type: 'ONE_TIME_SYNCHRONOUS',
      },
      pricing: {
        supports_reselling: false,
      },
      supported_countries: ['USA', 'GBR'],
      supported_features: [
        process.env.CHECK_TYPE === "LINK" ? "EXTERNAL_LINK" : "EXTERNAL_EMBED",
      ],
      credentials: {
        fields: [],
      },
      config: {
        fields: [
          {
            type: 'string',
            name: 'country_of_inc_rule',
            label: 'Country of incorporation to pass check',
            options: [{
              label: "USA",
              value: "USA"
              },
              {
              label: "GBR",
              value: "GBR"
              }]
            }]
        },
    };

    return config;
  }

  async runChecks(req: Request, checkRequest: OTS_CC_CheckRequestType): Promise<OTS_CC_CheckResponse> {
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

  async runCheck(checkRequest: OTS_CC_CheckRequestType): Promise<OTS_CC_CheckResponse> {
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

  async runIFrameValidation(req: Request, version: number, valid_until: number, auditee_id: string, signature: string, id: string) {
    const config = appConfig();
    
    const urls: FormattedUrls = formatUrlsForSignature(config.externalUrl, req.originalUrl);

    const key: string = process.env.INTEGRATION_SECRET_KEY;

    validateIFrameSignature(
      version,
      valid_until,
      auditee_id,
      signature,
      urls.url,
      urls.fullUrl,
      key
    );

    const secretKey = process.env.JWT_SECRET;
    const expirationTime = process.env.JWT_EXPIRATION_TIME;

    const token = await generateSignedAccessToken(auditee_id, id, secretKey, expirationTime);


    const HTML = generateRedirectHTML(token.access_token, config.externalUrl, id);
    return HTML;
  }
}
