import { UserDto } from 'src/modules/users/dto/user.dto';
import { TokenPayloadDto } from './token-payload.dto';
import { ClassField } from 'src/@common/decorators/field.decorators';

export class LoginPayloadDto {
  @ClassField(() => UserDto)
  user: UserDto;

  @ClassField(() => TokenPayloadDto)
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
