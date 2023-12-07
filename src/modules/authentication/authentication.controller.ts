import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './authentication.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return new LoginPayloadDto(user, token);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    return this.userService.createUser(userRegisterDto);
  }
}
