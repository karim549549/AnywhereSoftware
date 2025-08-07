import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenFactory } from './factories/token.factory';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME_KEY,
} from '../common/constants/auth.constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_ACCESS_SECRET),
        signOptions: {
          expiresIn:
            configService.get<string>(JWT_ACCESS_TOKEN_EXPIRATION_TIME_KEY) +
            's',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenFactory, JwtStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
