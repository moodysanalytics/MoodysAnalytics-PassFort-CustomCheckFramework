import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service.js';
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
  // providers: [AuthService],
  controllers: [],
  exports: [ jwt],
})
export class AuthModule {}
