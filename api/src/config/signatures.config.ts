/*
When implementing an integration, you must generate a 32 byte key secret key to sign and verify all requests and responses your integration handles, 
unless specifically noted in this document; the key ID to use should be the first 8 characters of the Base64 encoding of this key. 
The only supported algorithm is hmac-sha256, and the only supported Digest is SHA-256.
https://passfort.github.io/integration-docs/?javascript#authentication
*/

import { registerAs } from '@nestjs/config';
export default registerAs('signatures', () => ({
  secretKeyBase64: process.env.INTEGRATION_SECRET_KEY,
  secretKeyId: process.env.INTEGRATION_SECRET_KEY.slice(0, 8),
}));
