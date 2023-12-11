import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { BaseDto } from 'src/@base/dto/base.dto';
import {
  DateField,
  EmailField,
  EnumField,
  NumberField,
  NumberFieldOptional,
  PhoneFieldOptional,
  StringField,
} from 'src/@common/decorators/field.decorators';
import { RoleType } from '../types/user.types';
import { Exclude } from 'class-transformer';

export class UserDto extends BaseDto {
  @EnumField(() => RoleType)
  role: RoleType;

  @EmailField({ swagger: true })
  email: string;

  @Exclude()
  password?: string | null;

  @PhoneFieldOptional({ swagger: true })
  phone: string | null;

  @StringField({ swagger: true })
  avatar: string | null;

  @StringField({ swagger: true })
  username: string;

  @StringField({ swagger: true })
  aboutMe: string | null;

  @DateField({ swagger: true })
  birthDate: Date;

  @NumberField({ swagger: true })
  weight: number;

  @NumberField({ swagger: true })
  height: number;

  @NumberField({ swagger: true })
  bodyFat: number;
}

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['createdAt', 'updatedAt', '_id'] as const),
) {}

export class UserQueryDto extends PartialType(
  OmitType(UserDto, ['createdAt', 'updatedAt'] as const),
) {
  @ApiPropertyOptional()
  @NumberFieldOptional()
  skip?: number;

  @ApiPropertyOptional()
  @NumberFieldOptional()
  limit?: number;
}
