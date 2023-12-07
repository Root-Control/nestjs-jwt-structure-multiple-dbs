import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/@base/dto/base.dto';
import { RoleType } from '../types/user.types';
import { Exclude } from 'class-transformer';

export class UserDto extends BaseDto {
  @ApiProperty()
  firstName: string | null;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  username!: string;

  @ApiProperty({ enum: RoleType })
  role: RoleType;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  avatar: string | null;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  isActive: boolean;

  @Exclude()
  password: string | null;
}
