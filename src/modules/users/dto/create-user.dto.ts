import { RoleType } from '../types/user.types';
import {
  DateField,
  EmailField,
  EnumFieldOptional,
  NumberField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
  StringFieldOptional,
} from 'src/@common/decorators/field.decorators';

export class CreateUserDto {
  @StringField({ swagger: true })
  username: string;

  @EmailField({ swagger: true })
  email: string;

  @PasswordField({ swagger: true })
  password: string;

  @StringField({ swagger: true })
  aboutMe: string;

  @DateField({ swagger: true })
  birthDate: Date;

  @NumberField({ swagger: true })
  weight: number;

  @NumberField({ swagger: true })
  height: number;

  @NumberField({ swagger: true })
  bodyFat: number;

  @StringFieldOptional({ swagger: true })
  avatar?: string;

  @PhoneFieldOptional({ swagger: true })
  phone?: string;

  @EnumFieldOptional(() => RoleType)
  role?: RoleType;
}
