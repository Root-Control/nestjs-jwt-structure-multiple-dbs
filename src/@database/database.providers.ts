import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

export const DatabaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
      migrations: [`${__dirname}/../migrations/*.{ts,js}`],
      synchronize: true,
      dropSchema: false,
    };
  },
});
