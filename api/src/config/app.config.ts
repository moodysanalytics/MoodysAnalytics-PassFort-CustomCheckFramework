import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  logJson: process.env.LOG_JSON === 'true',
  urlPrefix: process.env.URL_PREFIX || '',
  externalUrl: process.env.EXTERNAL_URL,
}));
