import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleController } from './articles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticlesService, PrismaService],
})
export class ArticlesModule {}
