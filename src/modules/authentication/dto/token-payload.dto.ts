import { IsNumber, IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsNumber()
  expiresIn: number;

  @IsString()
  accessToken: string;
}
