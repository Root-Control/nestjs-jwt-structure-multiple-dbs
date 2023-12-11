import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { BaseDto } from 'src/@base/dto/base.dto';
import {
  NumberFieldOptional,
  StringField,
} from 'src/@common/decorators/field.decorators';

export class ArticleDto extends BaseDto {
  @StringField({ swagger: true })
  title: string;

  @StringField({ swagger: true })
  content: string;
}

export class UpdateArticleDto extends PartialType(
  OmitType(ArticleDto, ['createdAt', 'updatedAt', '_id'] as const),
) {}

export class ArticleQueryDto extends PartialType(
  OmitType(ArticleDto, ['createdAt', 'updatedAt'] as const),
) {
  @ApiPropertyOptional()
  @NumberFieldOptional()
  skip: number;

  @ApiPropertyOptional()
  @NumberFieldOptional()
  limit: number;
}
