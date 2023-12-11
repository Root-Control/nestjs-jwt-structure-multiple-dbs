import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class BaseDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  @Transform((value) => value.obj._id.toString())
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
