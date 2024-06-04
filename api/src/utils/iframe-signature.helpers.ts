import { Request } from 'express';
import appConfig from '../config/app.config.js';
import { AuthService } from '../auth/auth.service.js';

const config = appConfig();

export const validateIFrameSignatureHelper = async (
  req: Request,
  version: number,
  valid_until: number,
  auditee_id: string,
  signature: string,
  id: string,
  authService: AuthService,
) => {
  const extUrl = new URL(config.externalUrl);
  // The "real" url is the configured external URL's protocol/domain/port (aka "origin")
  // plus the "original URL" (aka request path).
  const fullUrl = `${extUrl.origin}${req.originalUrl}`;
  const signatureStartIndex = fullUrl.indexOf('&signature');
  const url = fullUrl.slice(0, signatureStartIndex);

  const token = await authService.createAccessToken(
    version,
    valid_until,
    auditee_id,
    signature,
    url,
    id,
  );

  // JSON encode + base64 the info we inject into the HTML template
  // to prevent attempts at XSS/HTML injection.
  // Rationale: if an attacker can control `id` or `token.access_token`,
  // they could inject quotes and HTML tags to execute code of their
  // choice with access to our application and the Moody's domain.
  // How this fixes it:
  // * converting to JSON allows us to pass as many values as we like
  //   and only go through the process once
  // * parsing JSON in the browser doesn't require any additional code
  //   on browsers modern enough to support our app
  // * by base64 encoding the resulting JSON, characters which can break
  //   the JS code can never be present (', ", </script>) in the text
  //   injected into the page
  // * once the reverse process (b64decode + JSON parse) is done, the original
  //   unaltered values are usable
  const data = {
    tokenName: `token-${id}`,
    accessToken: token.access_token,
    goTo: `${config.externalUrl}/${id}`,
  };
  // This can now never contain "unsafe" data
  const safeEncodedData = Buffer.from(JSON.stringify(data)).toString('base64');

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loading Custom Check...</title>
    </head>
    <body>
        <script>
            var safeEncodedData = '${safeEncodedData}'
            ${'' /* NB the browser atob function is base64 decoding */}
            var data = JSON.parse(atob(safeEncodedData))
            sessionStorage.setItem(data.tokenName, data.accessToken)
            window.location = data.goTo
        </script>
    </body>
    </html>;`;
};
