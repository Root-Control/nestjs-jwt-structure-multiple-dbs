import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { plainToClass } from 'class-transformer';
import { UserDto, UserQueryDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getErrorMessage } from 'src/@common/utilities/mongodb-parser';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<UserDocument>,
  ) {}

  async findOne(queryDto: UserQueryDto): Promise<UserDto> {
    try {
      const user = await this.userModel.findOne(queryDto);
      if (!user) {
        throw new Error(`${this.userModel.modelName} not found`);
      }
      return plainToClass(UserDto, user.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const userRepository = new this.userModel(createUserDto);
      const result = await userRepository.save();
      return plainToClass(UserDto, result.toObject());
    } catch (ex) {
      throw new HttpException(
        getErrorMessage(ex),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
