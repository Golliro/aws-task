import { Injectable } from '@nestjs/common';
import {
  //   CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  SignUpCommand,
  SignUpCommandInput,
  ConfirmSignUpCommandInput,
  ResendConfirmationCodeCommandInput,
  ForgotPasswordCommandInput,
  ConfirmForgotPasswordCommandInput,
  ChangePasswordCommandInput,
  InitiateAuthCommandInput,
  InitiateAuthCommand,
  //   RespondToAuthChallengeCommand,
  //   RespondToAuthChallengeCommandInput,
  //   GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoClient } from '@libs/cognito.lib';
import {
  CognitoCreateDto,
  CognitoConfirmSignUpDto,
  CognitoResendConfirmSignUpDto,
  CognitoChangePasswordDto,
  SignInDto,
  CognitoConfirmForgotPasswordDto,
  CognitoForgotPasswordDto,
} from './cognito.dto';
@Injectable()
export class CognitoService {
  //   private readonly cognitoClient: CognitoIdentityProviderClient;

  // Signup command
  async signUpCommand(data: CognitoCreateDto) {
    const { username, password, email } = data;

    const params: SignUpCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID || '',
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'preferred_username',
          Value: username,
        },
      ],
    };

    return await CognitoClient.send(new SignUpCommand(params));
  }

  // signin Command
  async signInCommand(data: SignInDto) {
    const { username, password } = data;

    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    return await CognitoClient.send(new InitiateAuthCommand({ ...params }));
  }

  // Confirm signup command
  async confirmSignUpCommand(data: CognitoConfirmSignUpDto) {
    const { username, confirmationCode } = data;
    const params: ConfirmSignUpCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: confirmationCode,
    };

    return await CognitoClient.send(new ConfirmSignUpCommand(params));
  }

  // resend confirmation code
  async resendConfirmationCodeCommand(data: CognitoResendConfirmSignUpDto) {
    const { username } = data;
    const params: ResendConfirmationCodeCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
    };

    return await CognitoClient.send(new ResendConfirmationCodeCommand(params));
  }

  // forgot Passowrd
  async forgotPasswordCommand(data: CognitoForgotPasswordDto) {
    const { username } = data;
    const params: ForgotPasswordCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
    };

    return await CognitoClient.send(new ForgotPasswordCommand(params));
  }

  // confirm forgot password
  async confirmForgotPasswordCommand(data: CognitoConfirmForgotPasswordDto) {
    const { username, confirmationCode, newPassword } = data;
    const params: ConfirmForgotPasswordCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
    };
    try {
      return await CognitoClient.send(new ConfirmForgotPasswordCommand(params));
    } catch (error) {
      console.log(error);
      if (error?.name === 'InvalidPasswordException') {
        throw new Error(
          'Password must have uppercase, lowercase, number, special character and minimum 12 characters.',
        );
      }
      throw error;
    }
  }

  // change password using accessToken
  async changePasswordCommand(data: CognitoChangePasswordDto) {
    const { accessToken, oldPassword, newPassword } = data;
    const params: ChangePasswordCommandInput = {
      AccessToken: accessToken,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };
    return await CognitoClient.send(new ChangePasswordCommand(params));
  }
}
