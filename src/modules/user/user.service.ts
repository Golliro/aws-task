import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      return await this.cognitoService.signInCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async createUser(body: UserCreateDto) {
    try {
      return await this.cognitoService.signUpCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async confirmUser(body: UserConfirmSignUpDto) {
    try {
      return await this.cognitoService.confirmSignUpCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async resendComfirmCode(body: UserResendConfirmSignUpDto) {
    try {
      return await this.cognitoService.resendConfirmationCodeCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async forgotUserPassword(body: UserForgotPasswordDto) {
    try {
      return await this.cognitoService.forgotPasswordCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async confirmForgotUserPassowrd(body: UserConfirmForgotPasswordDto) {
    try {
      return await this.cognitoService.confirmForgotPasswordCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async changeUserPassword(body: UserChangePasswordDto) {
    try {
      return await this.cognitoService.changePasswordCommand(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
