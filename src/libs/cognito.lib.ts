import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
export const CognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION || 'ap-southeast-1',
});
