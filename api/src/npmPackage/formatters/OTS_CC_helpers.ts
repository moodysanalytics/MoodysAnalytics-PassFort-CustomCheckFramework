import { CheckResponse, PassFortError, ExternalResource, Result, PassFortWarning, Decision, ResourceType } from '../types/OTS_CC_CheckResponse.js';

export const build_OTS_CC_CheckResponse = (result: Result, warnings: PassFortWarning[], errors: PassFortError[], external_resources: ExternalResource, provider_data: string) => {
    const response: CheckResponse = {
        provider_data: provider_data,
        warnings: warnings,
        errors: errors,
        external_resources: [external_resources],
        result: result,
      };

      /*
      without nest class validation, should I throw a specific error
      if the response object is not properly formatted?
      */
    
      return response;
};

export const build_OTS_CC_ExternalResource = (type: ResourceType, url: string, id: string, label: string) => {
    const external_resources: ExternalResource = {
        type: type,
        url: url,
        id: id,
        label: label,
      };
    
      return external_resources;
}

export const build_OTS_CC_Result = (decision: Decision, summary: string) => {
    const result: Result = {
        decision: decision,
        summary: summary,
      };
    
      return result;
}