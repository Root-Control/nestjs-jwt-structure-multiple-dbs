import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getErrorMessage } from 'src/@common/utilities/mongodb-parser';

@Injectable()
export abstract class CrudService<
  DTO,
  CreateDto,
  QueryDTO extends { skip?: number; limit?: number },
  UpdateDto,
> {
  private dtoClass: new (...args: any[]) => DTO;
  protected constructor(
    private readonly model,
    dtoClass: new (...args: any[]) => DTO,
  ) {
    this.dtoClass = dtoClass;
  }

  async create(createArticleDto: CreateDto): Promise<DTO> {
    try {
      const Repository = new this.model(createArticleDto);
      const result = await Repository.save();
      return plainToClass(this.dtoClass, result.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async find(queryDto: QueryDTO): Promise<DTO[]> {
    const { skip, limit, ...props } = queryDto;
    const items = await this.model.find(props, null, { skip, limit });

    return items.map((it) => plainToClass(this.dtoClass, it.toObject()));
  }

  async findById(_id: string): Promise<any> {
    try {
      const result = await this.model.findById(_id);

      if (!result) {
        throw new Error(`${this.model.modelName} not found`);
      }
      return plainToClass(this.dtoClass, result.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async findOne(queryDto: QueryDTO): Promise<DTO> {
    try {
      const article = await this.model.findOne(queryDto);
      if (!article) {
        throw new Error(`${this.model.modelName} not found`);
      }
      return plainToClass(this.dtoClass, article.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async update(_id: string, payload: UpdateDto): Promise<DTO> {
    try {
      const article = await this.model.findOneAndUpdate({ _id }, payload, {
        new: true,
      });
      if (!article) {
        throw new Error(`${this.model.modelName} not found`);
      }

      return plainToClass(this.dtoClass, article.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async delete(_id: string): Promise<{ success: boolean }> {
    const model = await this.model.deleteOne({ _id });

    return {
      success: model.acknowledged,
    };
  }
}
