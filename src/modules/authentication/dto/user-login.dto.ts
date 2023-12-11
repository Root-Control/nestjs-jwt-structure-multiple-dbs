import {
  EmailField,
  PasswordField,
} from 'src/@common/decorators/field.decorators';

export class UserLoginDto {
  @EmailField()
  readonly email!: string;

  @PasswordField()
  readonly password!: string;
}
