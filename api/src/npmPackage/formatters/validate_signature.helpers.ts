// import { BadRequestAppException, CheckErrorTypes, UnauthorizedAppException, ValidationException } from '@moodys/custom-check-helpers';
// import { AsyncAccessTokenType, FormattedUrls } from '../types/signature_validation.types.js';
// import * as crypto from 'crypto';
// import jwt from 'jsonwebtoken';

// export const formatUrlsForSignature = (frontendUrl: string, originalUrl: string): FormattedUrls => {
//     /*
//     OriginalUrl is the path of the request, this is available on the Express Request object as .originalUrl.
//     The frontendUrl is the URL that the iframe will be hosted on, we use an environment variable for this.
//     */
//     const extUrl = new URL(frontendUrl);
//     const fullUrl = `${extUrl.origin}${originalUrl}`;
//     const signatureStartIndex = fullUrl.indexOf('&signature');
//     return {
//         url: fullUrl.slice(0, signatureStartIndex),
//         fullUrl: fullUrl,
//     };
// }

// export const validateIFrameSignature = (version: number,
//     valid_until: number,
//     auditee_id: string,
//     signature: string, 
//     url: string, 
//     fullUrl: string,
//     key: string) => {
//     if (
//       version === undefined ||
//       valid_until === undefined ||
//       auditee_id === undefined ||
//       signature === undefined
//     ) {
//       throw new BadRequestAppException('Missing required query parameter(s)');
//     } else {

//       if (fullUrl !== url + '&signature=' + encodeURIComponent(signature)) {
//         // If someone attempts to tack on paremeters after the signature, throw an error
//         // Otherwise, a malicious user could alter the valid_until, auditee_id, or version parameters
//         throw new ValidationException('Signature is invalid (tampering detected)', CheckErrorTypes.SIGNATURE_ERROR);
//       }

//       const nowMilliseconds = Date.now();
//       const validUntilMilliseconds = valid_until * 1000;

//       if (nowMilliseconds > validUntilMilliseconds) {
//         throw new UnauthorizedAppException('Signature has expired');
//       } else {

//         const bufferedSignature = Buffer.from(signature, 'base64');
//         const secretKey = crypto.createSecretKey(key, 'base64');

//         const hmac = crypto.createHmac('sha256', secretKey);
//         hmac.update(url);

//         const ourSignature = hmac.digest();

//         let valid = false;
//         try {
//           valid = crypto.timingSafeEqual(bufferedSignature, ourSignature);
//         } catch (e) {
//           if (e instanceof RangeError) {
//             throw new UnauthorizedAppException('Signature is invalid');
//           }
//           throw e;
//         }

//         if (!valid) {
//           throw new UnauthorizedAppException('Signature is invalid');
//         }
//       }
//     }
//   }

//   export const generateSignedAccessToken = async (auditee_id: string, id: string, secretKey: string, expirationTime: string): Promise<AsyncAccessTokenType> => {
//     return {
//         access_token: new Promise((resolve, reject) => {
//             jwt.sign(
//                 { sub: auditee_id, result_id: id },
//                 secretKey,
//                 { expiresIn: expirationTime},
//                 (err, token) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(token);
//                 }
//                 }
//             );
//         })
//     };
//   }

//   export const generateRedirectHTML = (access_token: Promise<string>, externalUrl: string, id: string) => {
//     /*
//     The access token can be generated using the generateSignedAccessToken function.
//     The external URL is the URL that the iFrame or LINK will redirect to.
//     The id is an identifier (typically some metadata from the entity) to identify the check.
//     */


//     // JSON encode + base64 the info we inject into the HTML template
//     // to prevent attempts at XSS/HTML injection.
//     // Rationale: if an attacker can control `id` or `token.access_token`,
//     // they could inject quotes and HTML tags to execute code of their
//     // choice with access to our application and the Moody's domain.
//     // How this fixes it:
//     // * converting to JSON allows us to pass as many values as we like
//     //   and only go through the process once
//     // * parsing JSON in the browser doesn't require any additional code
//     //   on browsers modern enough to support our app
//     // * by base64 encoding the resulting JSON, characters which can break
//     //   the JS code can never be present (', ", </script>) in the text
//     //   injected into the page
//     // * once the reverse process (b64decode + JSON parse) is done, the original
//     //   unaltered values are usable

//     const data = {
//         tokenName: `token-${id}`,
//         accessToken: access_token,
//         goTo: `${externalUrl}/${id}`,
//     };
//     // This can now never contain "unsafe" data
//     const safeEncodedData = Buffer.from(JSON.stringify(data)).toString('base64');

//     return `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Loading Custom Check...</title>
//         </head>
//         <body>
//             <script>
//                 var safeEncodedData = '${safeEncodedData}'
//                 ${'' /* NB the browser atob function is base64 decoding */}
//                 var data = JSON.parse(atob(safeEncodedData))
//                 sessionStorage.setItem(data.tokenName, data.accessToken)
//                 window.location = data.goTo
//             </script>
//         </body>
//         </html>;`;
//   }