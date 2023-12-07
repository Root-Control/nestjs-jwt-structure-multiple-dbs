import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  ArticleDto,
  ArticleQueryDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create an article' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article successfully created.',
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article list loaded.',
    type: [ArticleDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  find(@Query() articleQueryDto: ArticleQueryDto): Promise<ArticleDto[]> {
    return this.articleService.find(articleQueryDto);
  }

  @Get(':articleId')
  @ApiOperation({ summary: 'Get Article By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article By Id Loaded.',
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  findById(@Param('articleId') articleId: string): Promise<ArticleDto> {
    return this.articleService.findOne({ id: articleId });
  }

  @Put(':articleId')
  @ApiOperation({ summary: 'Get Article By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article Updated.',
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  updateById(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDto> {
    return this.articleService.update(articleId, updateArticleDto);
  }

  @Delete(':articleId')
  @ApiOperation({ summary: 'Delete Article By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article Deleted.',
    type: DeleteResult,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  deleteById(@Param('articleId') articleId: string): Promise<DeleteResult> {
    return this.articleService.delete(articleId);
  }
}
