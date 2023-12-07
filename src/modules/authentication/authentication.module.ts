import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { JwtConfig } from 'src/@common/env-configuration/config.type';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<JwtConfig>('jwt');
        return {
          privateKey: jwtConfig.privateKey.replace(/\\n/g, '\n'),
          publicKey: jwtConfig.publicKey.replace(/\\n/g, '\n'),
          signOptions: {
            algorithm: 'RS256',
          },
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
