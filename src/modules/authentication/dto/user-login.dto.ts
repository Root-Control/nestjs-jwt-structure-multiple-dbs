import {
  PasswordField,
  StringField,
} from 'src/@common/decorators/field.decorators';

export class UserLoginDto {
  @StringField()
  readonly usernameOrEmail!: string;

  @PasswordField()
  readonly password!: string;
}
