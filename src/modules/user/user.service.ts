import { Injectable } from '@nestjs/common';
import { CognitoService } from '@modules/cognito/cognito.service';
import {
  SignInDto,
  UserChangePasswordDto,
  UserConfirmForgotPasswordDto,
  UserConfirmSignUpDto,
  UserCreateDto,
  UserForgotPasswordDto,
  UserResendConfirmSignUpDto,
} from './user.dto';
@Injectable()
export class UserService {
  constructor(private cognitoService: CognitoService) {}
  async userSignIn(body: SignInDto) {
    return await this.cognitoService.signInCommand(body);
  }
  async createUser(body: UserCreateDto) {
    return await this.cognitoService.signUpCommand(body);
  }
  async confirmUser(body: UserConfirmSignUpDto) {
    return await this.cognitoService.confirmSignUpCommand(body);
  }
  async resendComfirmCode(body: UserResendConfirmSignUpDto) {
    return await this.cognitoService.resendConfirmationCodeCommand(body);
  }
  async forgotUserPassword(body: UserForgotPasswordDto) {
    return await this.cognitoService.forgotPasswordCommand(body);
  }
  async confirmForgotUserPassowrd(body: UserConfirmForgotPasswordDto) {
    return await this.cognitoService.confirmForgotPasswordCommand(body);
  }
  async changeUserPassword(body: UserChangePasswordDto) {
    return await this.cognitoService.changePasswordCommand(body);
  }
}
