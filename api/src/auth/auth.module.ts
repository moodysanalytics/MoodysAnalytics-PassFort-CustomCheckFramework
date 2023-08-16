import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';

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
  providers: [AuthService],
  controllers: [],
  exports: [AuthService, jwt],
})
export class AuthModule {}
