import { CheckRequest, ProviderConfig, Metadata } from '../types/check_request.js';
import { plainToClass } from '@nestjs/class-transformer';
import { validateOrReject } from '@nestjs/class-validator';
import { Result, CheckResponse, Decision } from '@moodys/custom-check-helpers';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';
// import {
//   InvalidCredentials,
//   InvalidResponse,
//   ProviderConnectionError,
//   ProviderError,
//   UnsupportedDemoResult,
// } from '../types/app_exception.js';
import { InvalidCredentials, InvalidResponse, ProviderConnectionError, ProviderError, UnsupportedDemoResult } from "@moodys/custom-check-helpers";
import { DemoResultType } from '../types/demo_result.types.js';

const runDemoCheck = (demoResult: string): CheckResponse => {
  switch (demoResult) {
    case DemoResultType.ANY:
    case DemoResultType.ANY_CHARGE:
    case DemoResultType.EXTERNAL_RESOURCE_EMBED:
    case DemoResultType.EXTERNAL_RESOURCE_LINK:
      const responsePlain = {
        provider_data: 'Demo result. Did not make request to provider.',
        warnings: [],
        errors: [],
        external_resources: [
          {
            type: (process.env.CHECK_TYPE as string) || 'LINK',
            url: `url_for_redirect/query_param_appended_here`,
            id: '00000000-0000-0000-0000-000000000000',
            label: 'Example check',
          },
        ],
        result: {
          decision: 'PASS',
          summary: "It's a pass...",
        },
      };
      responsePlain.external_resources[0].url = getExternalUrl('1');

      if (demoResult === DemoResultType.EXTERNAL_RESOURCE_LINK) {
        responsePlain.external_resources[0].type = (process.env.CHECK_TYPE as string) ||'LINK';
        responsePlain.external_resources[0].label = (process.env.CHECK_TYPE as string) === 'EMBED' ? 'Example embed' : 'Example link';
      }

      const response = plainToClass(CheckResponse, responsePlain);

      validateOrReject(response).catch(() => {
        throw new InvalidResponse();
      });
      return response;

    case DemoResultType.ERROR_CONNECTION_TO_PROVIDER:
      throw new ProviderConnectionError();

    case DemoResultType.ERROR_INVALID_CREDENTIALS:
      throw new InvalidCredentials();

    case DemoResultType.ERROR_ANY_PROVIDER_MESSAGE:
      throw new ProviderError(
        'API is not available at this time. Please try again later.',
      );

    default:
      throw new UnsupportedDemoResult();
  }
};

export const getExternalUrl = (resultId: string): string => {
  // If urlPrefix is set, then our API base URL is always {externalUrl}/api
  // urlPrefix is just used for mounting
  const config: ConfigType<typeof appConfig> = appConfig();
  const urlBase = config.urlPrefix
    ? `${config.externalUrl}/api`
    : config.externalUrl;

  return `${urlBase}/validateSignature/${resultId}`; 
};

const createResponseObject = async (
  metadata: Metadata,
  checkRequest: CheckRequest,
): Promise<CheckResponse> => {
  const result = decideCheckResult(checkRequest.provider_config, metadata);

  const response: CheckResponse = plainToClass(CheckResponse, {
    provider_data: 'Your check data here',
    warnings: [],
    errors: [],
    external_resources: [
      {
        type: (process.env.CHECK_TYPE as string) || 'EMBED',
        url: getExternalUrl(metadata.bvd_id),
        id: checkRequest.id,
        label: 'Demo Check Result',
      },
    ],
    result: result,
  });

  await validateOrReject(response).catch(() => {
    throw new InvalidResponse();
  });

  return response;
};

export const decideCheckResult = (
  providerConfig: ProviderConfig,
  metadata: Metadata,
): Result => {
  // Customize what PassFort will display regarding your check results
  const decision = decideCheckDecision(providerConfig, metadata);

  let base = `This result was determined by Moody's Analytics.`;

  if (decision === Decision.PASS) {
    base += ` This profile is incorporated in the selected country, ${providerConfig.country_of_inc_rule}.`;
  } else {
    base += ` This profile is not incorporated in the selected country, ${providerConfig.country_of_inc_rule}.`;
  }

  return {
    decision: decision,
    summary: base,
  };
};

export const decideCheckDecision = (
  providerConfig: ProviderConfig,
  metadata: Metadata,
): Decision => {
  const checkRule = providerConfig.country_of_inc_rule;

  if (checkRule === metadata.country_of_incorporation) {
    return Decision.PASS;
  } else {
    return Decision.FAIL;
  }
};

export { runDemoCheck, createResponseObject };
