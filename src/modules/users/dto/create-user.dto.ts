import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { RoleType } from '../types/user.types';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ enum: RoleType })
  @IsEnum(RoleType)
  role?: RoleType;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phone: string;
}
