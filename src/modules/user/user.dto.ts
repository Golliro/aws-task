import { ApiProperty } from '@nestjs/swagger';
export class UserCreateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
export class UserConfirmSignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  confirmationCode: string;
}
export class UserResendConfirmSignUpDto {
  @ApiProperty()
  username: string;
}
export class UserChangePasswordDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
export class SignInDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class UserConfirmForgotPasswordDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  confirmationCode: string;
  @ApiProperty()
  newPassword: string;
}
export class UserForgotPasswordDto {
  @ApiProperty()
  username: string;
}
