import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { plainToClass } from 'class-transformer';

interface Identifiable {
  id: string;
}

@Injectable()
export abstract class CrudService<
  T extends Identifiable,
  DTO,
  CreateDto extends DeepPartial<T>,
  QueryDTO extends { skip?: number; take?: number },
  UpdateDto extends DeepPartial<T>,
> {
  private dtoClass: new (...args: any[]) => DTO;
  protected constructor(
    protected readonly repository: Repository<T>,
    dtoClass: new (...args: any[]) => DTO,
  ) {
    this.dtoClass = dtoClass;
  }

  async create(createDto: CreateDto): Promise<DTO> {
    try {
      const entity = this.repository.create(createDto);
      const savedEntity = await this.repository.save(entity);
      return plainToClass(this.dtoClass, savedEntity);
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async find(queryDto: QueryDTO): Promise<DTO[]> {
    try {
      const { skip, take, ...props } = queryDto;
      const query: FindManyOptions = { where: props, skip, take };
      const entities = await this.repository.find(query);
      return entities.map((entity) => plainToClass(this.dtoClass, entity));
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(find: FindOptionsWhere<T>): Promise<DTO> {
    try {
      const entity = await this.repository.findOne({ where: find });
      return plainToClass(this.dtoClass, entity);
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: string, updateDto: UpdateDto): Promise<DTO> {
    try {
      const entity = await this.repository.findOneBy({
        id,
      } as FindOptionsWhere<T>);
      if (!entity) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      const updated = this.repository.merge(entity, updateDto);
      const savedEntity = await this.repository.save(updated);
      return plainToClass(this.dtoClass, savedEntity);
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
