import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ArticleQueryDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content: string }): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  async find(articleQueryDto: ArticleQueryDto): Promise<Article[]> {
    console.log(articleQueryDto);
    return this.prisma.article.findMany();
  }

  async findOne(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: { title?: string; content?: string },
  ): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
