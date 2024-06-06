// import { CheckResponse, PassFortError, ExternalResource, Result, PassFortWarning, Decision, ResourceType } from '../types/OTS_CC_CheckResponse.js';

// export const build_OTS_CC_CheckResponse = (result: Result, warnings: PassFortWarning[], errors: PassFortError[], external_resources: ExternalResource, provider_data: string) => {
//     const response: CheckResponse = {
//         provider_data: provider_data,
//         warnings: warnings,
//         errors: errors,
//         external_resources: [external_resources],
//         result: result,
//       };

//       /*
//       without nest class validation, should I throw a specific error
//       if the response object is not properly formatted?
//       */
    
//       return response;
// };

// export const build_OTS_CC_ExternalResource = (type: ResourceType, url: string, id: string, label: string) => {
//     const external_resources: ExternalResource = {
//         type: type,
//         url: url,
//         id: id,
//         label: label,
//       };
    
//       return external_resources;
// }

// export const build_OTS_CC_Result = (decision: Decision, summary: string) => {
//     const result: Result = {
//         decision: decision,
//         summary: summary,
//       };
    
//       return result;
// }

// import { Decision, InvalidCredentials, InvalidResponse, ProviderConnectionError, ProviderError, ResourceType, UnsupportedDemoResult } from "@moodys/custom-check-helpers";
// import { DemoResultType, CheckResponse } from '../types/OTS_CC_CheckResponse.js';

// export const runDemoCheck = (demoResult: string, url: string, resourceType: ResourceType): CheckResponse => {
//   switch (demoResult) {
//     case DemoResultType.ANY:
//     case DemoResultType.ANY_CHARGE:
//     case DemoResultType.EXTERNAL_RESOURCE_EMBED:
//     case DemoResultType.EXTERNAL_RESOURCE_LINK:
//         /*
//         Added this try/catch to replace the plainToClass and validateOrReject functions from nestjs.
//         */
//         try {
//             const responsePlain: CheckResponse = {
//               provider_data: 'Demo result. Did not make request to provider.',
//               warnings: [],
//               errors: [],
//               external_resources: [
//                 {
//                   type: resourceType || ResourceType.LINK,
//                   url: url,
//                   id: '00000000-0000-0000-0000-000000000000',
//                   label: 'Example check',
//                 },
//               ],
//               result: {
//                 decision: Decision.PASS,
//                 summary: "It's a pass...",
//               },
//             };
          
//             if (demoResult === DemoResultType.EXTERNAL_RESOURCE_LINK) {
//               responsePlain.external_resources[0].type = (process.env.CHECK_TYPE as ResourceType) || ResourceType.LINK;
//               responsePlain.external_resources[0].label = (process.env.CHECK_TYPE as ResourceType) === ResourceType.EMBED ? 'Example embed' : 'Example link';
//             }
//             return responsePlain;
//           } catch (error) {
//             throw new InvalidResponse();
//           }

//     case DemoResultType.ERROR_CONNECTION_TO_PROVIDER:
//       throw new ProviderConnectionError();

//     case DemoResultType.ERROR_INVALID_CREDENTIALS:
//       throw new InvalidCredentials();

//     case DemoResultType.ERROR_ANY_PROVIDER_MESSAGE:
//       throw new ProviderError(
//         'API is not available at this time. Please try again later.',
//       );

//     default:
//       throw new UnsupportedDemoResult();
//   }
// };

import { FormattedUrls } from '../types/signature_validation.types.js';
export const formatUrlsForSignature = (frontendUrl: string, originalUrl: string): FormattedUrls => {
    /*
    OriginalUrl is the path of the request, this is available on the Express Request object as .originalUrl.
    The frontendUrl is the URL that the iframe will be hosted on, we use an environment variable for this.
    */
    const extUrl = new URL(frontendUrl);
    const fullUrl = `${extUrl.origin}${originalUrl}`;
    const signatureStartIndex = fullUrl.indexOf('&signature');
    return {
        url: fullUrl.slice(0, signatureStartIndex),
        fullUrl: fullUrl,
    };
}