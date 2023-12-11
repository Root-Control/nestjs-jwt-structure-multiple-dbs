import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './@common/env-configuration/config';
import { ArticlesModule } from './modules/articles';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ArticlesModule,
    MongooseModule.forRoot(
      'mongodb+srv://hpalacios:JxnIkYNLkgEKLUfb@formyfamily.qihg1.mongodb.net/fmf-dev',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
