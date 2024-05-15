import { ApiProperty } from '@nestjs/swagger';
export class CognitoCreateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
export class CognitoConfirmSignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  confirmationCode: string;
}
export class CognitoResendConfirmSignUpDto {
  @ApiProperty()
  username: string;
}
export class CognitoChangePasswordDto {
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
export class CognitoConfirmForgotPasswordDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  confirmationCode: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  email: string;
}
export class CognitoForgotPasswordDto {
  @ApiProperty()
  username: string;
}
