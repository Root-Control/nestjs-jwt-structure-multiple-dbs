import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { ArticleController } from './articles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleRepository, ArticlesService],
})
export class ArticlesModule {}
