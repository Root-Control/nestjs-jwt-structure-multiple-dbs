import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './articles.repository';
import { Article } from './article.entity';
import {
  ArticleDto,
  ArticleQueryDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { CrudService } from 'src/@base/generics/crud-generic';

@Injectable()
export class ArticlesService extends CrudService<
  Article,
  ArticleDto,
  CreateArticleDto,
  ArticleQueryDto,
  UpdateArticleDto
> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: ArticleRepository,
  ) {
    super(articleRepository, ArticleDto);
  }
}
