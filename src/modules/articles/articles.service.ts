import { Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './article.entity';
import {
  ArticleDto,
  ArticleQueryDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/@base/generics/crud-generic';

@Injectable()
export class ArticlesService extends CrudService<
  ArticleDto,
  CreateArticleDto,
  ArticleQueryDto,
  UpdateArticleDto
> {
  constructor(
    @InjectModel(Article.name) readonly articleModel: Model<ArticleDocument>,
  ) {
    super(articleModel, ArticleDto);
  }
}
