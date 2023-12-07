import {
  EmailField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from 'src/@common/decorators/field.decorators';

export class UserRegisterDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField({ toLowerCase: true })
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @PhoneFieldOptional()
  phone?: string;
}
