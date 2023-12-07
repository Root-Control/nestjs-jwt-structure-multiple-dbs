import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from '../authentication/dto/user-register.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { generateHash } from 'src/@common/utilities/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    findData: FindOptionsWhere<UserEntity>,
    validateDto: boolean = true,
  ): Promise<UserEntity | UserDto | null> {
    const user = await this.userRepository.findOneBy(findData);
    if (validateDto) {
      return plainToClass(UserDto, user);
    }
    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const hashedPassword = generateHash(userRegisterDto.password);
    const user = this.userRepository.create({
      ...userRegisterDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return plainToClass(UserDto, user);
  }
}
