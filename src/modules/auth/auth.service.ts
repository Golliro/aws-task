import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { LoginDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  private async login(authLoginUserDto: LoginDto) {
    const poolData = {
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    };
    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: authLoginUserDto.username,
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: authLoginUserDto.username,
      Password: authLoginUserDto.password,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userCognito = new CognitoUser(userData as any);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async authenticateUser(authLoginUserDto: LoginDto) {
    try {
      const response = await this.login(authLoginUserDto);
      return response;
    } catch (err) {
      console.log(
        '🚀 ~ file: app.service.ts:46 ~ AppService ~ authenticateUser ~ err:',
        err,
      );
      throw new BadRequestException();
    }
  }
}
