import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config.js';

const config = ConfigModule.forFeature(authConfig);
const jwt = JwtModule.registerAsync({
  imports: [config],
  useFactory: (config: ConfigType<typeof authConfig>) => ({
    global: true,
    secret: config.jwtSecret,
    signOptions: { expiresIn: config.jwtExpirationTime },
  }),
  inject: [authConfig.KEY],
});

@Module({
  imports: [config, jwt],
  controllers: [],
  exports: [ jwt],
})
export class AuthModule {}
