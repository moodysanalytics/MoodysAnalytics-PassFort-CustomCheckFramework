import { ProviderConfig, Metadata } from '../types/check_request.js';
import { Result, Decision } from '@moodys/custom-check-helpers';
import appConfig from '../config/app.config.js';
import { ConfigType } from '@nestjs/config';

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

