import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: 'Title of the article' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ description: 'Content of the article' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
