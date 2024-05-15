import {
  ExecutionContext,
  Logger,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { CognitoIdentityProvider as CognitoIdentityServiceProvider } from '@aws-sdk/client-cognito-identity-provider';
import { camelCase } from 'lodash';

export interface CognitoUser {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
  emailVerified: string;
  preferredUsername: string;
  email: string;
}
const getToken = (authHeader?: string) => {
  console.log(authHeader);
  const tokenArray = authHeader.split(' ', 2);
  if (!tokenArray[0] || tokenArray[0].toLowerCase() !== 'bearer') {
    throw new UnauthorizedException('Token type must be Bearer');
  }
  return tokenArray[1];
};

export const AuthUser = createParamDecorator(
  async (
    data: unknown,
    ctx: ExecutionContext,
  ): Promise<CognitoUser | undefined> => {
    try {
      const request = ctx.switchToHttp().getRequest();

      // return request.user;

      const { authorization } = request.headers;
      let authorizationString = '';
      if (Array.isArray(authorization)) {
        authorizationString = authorization[0];
      } else {
        authorizationString = authorization;
      }
      const cognitoClient = new CognitoIdentityServiceProvider({
        region: process.env.COGNITO_REGION || 'ap-southeast-1',
      });

      const userCognito = await cognitoClient.getUser({
        AccessToken: getToken(authorizationString),
      });
      const userAttributes = Object.fromEntries(
        userCognito.UserAttributes.map(({ Name, Value }) => [
          camelCase(Name),
          Value,
        ]),
      );

      return { ...userAttributes, ...(request?.user || {}) };
    } catch (err) {
      new Logger('AuthDecorator').error(err);
      throw new UnauthorizedException();
    }
  },
);
