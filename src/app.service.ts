import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EnvConfiguration,
  JwtConfig,
} from './@common/env-configuration/config.type';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService<EnvConfiguration>,
  ) {}

  test(): string {
    const jwtConfig = this.configService.get<JwtConfig>('jwt');
    console.log(jwtConfig);
    return jwtConfig.privateKey;
  }
}
