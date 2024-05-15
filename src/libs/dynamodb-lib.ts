export { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

const documentClient = new DynamoDB({
  region: 'ap-southeast-1',
});
export { documentClient };
