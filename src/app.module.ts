import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './@common/env-configuration/config';
import { ArticlesModule } from './modules/articles';
import { DatabaseModule } from './@database';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/authentication/authentication.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    ArticlesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
