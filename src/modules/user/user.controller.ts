import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import {
  SignInDto,
  UserChangePasswordDto,
  UserConfirmSignUpDto,
  UserCreateDto,
  UserResendConfirmSignUpDto,
  UserConfirmForgotPasswordDto,
  UserForgotPasswordDto,
} from './user.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  approve(@Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('/sign-up/confirm')
  reject(@Body() body: UserConfirmSignUpDto) {
    return this.userService.confirmUser(body);
  }

  @Post('sign-in')
  createPackage(@Body() body: SignInDto) {
    return this.userService.userSignIn(body);
  }

  @Post('/sign-up/confirm/resend')
  cancle(@Body() body: UserResendConfirmSignUpDto) {
    return this.userService.resendComfirmCode(body);
  }
  @Post('/forgot-password')
  forgotPassword(@Body() body: UserForgotPasswordDto) {
    return this.userService.forgotUserPassword(body);
  }
  @Post('/forgot-password/confirm')
  confirmForgotPassword(@Body() body: UserConfirmForgotPasswordDto) {
    return this.userService.confirmForgotUserPassowrd(body);
  }
  @Patch('/change-password')
  changePassword(@Body() body: UserChangePasswordDto) {
    return this.userService.changeUserPassword(body);
  }
}
