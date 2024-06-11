import { Result, Decision, BadRequestAppException } from '@moodys/custom-check-helpers';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';
import { RequestProviderConfig, RequestMetadata } from '../npmPackage/types/OTS_CC_CheckRequest.types.js';

/*
These are helpers made specifically for this skeleton. 
An actual implementation would handle things like url building and check decision making with it's own logic.
*/

export const getExternalUrl = (resultId: string): string => {
  // If urlPrefix is set, then our API base URL is always {externalUrl}/api
  // urlPrefix is just used for mounting
  const config: ConfigType<typeof appConfig> = appConfig();
  const urlBase = config.urlPrefix
    ? `${config.externalUrl}/api`
    : config.externalUrl;

  return `${urlBase}/validateSignature/${resultId}`; 
};

export const decideCheckResult = (
  providerConfig: RequestProviderConfig,
  metadata: RequestMetadata,
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
  providerConfig: RequestProviderConfig,
  metadata: RequestMetadata,
): Decision => {
  if (!providerConfig.country_of_inc_rule) {
    throw new BadRequestAppException('Country of incorporation rule is required in this dummy check.');
   }
  const checkRule = providerConfig.country_of_inc_rule;

  if (checkRule === metadata.country_of_incorporation) {
    return Decision.PASS;
  } else {
    return Decision.FAIL;
  }
};

