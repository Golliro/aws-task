import {
  CreateTableCommand,
  DynamoDBClient,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
export { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
const documentClient = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION || 'ap-southeast-1',
});
import { readdir } from 'fs/promises';
const migrateDynamoDB = async () => {
  try {
    const DynamoSchmas = await readdir('./dynamodb-entity');
    for (const file of DynamoSchmas) {
      const schema = await import(`../dynamodb-entity/${file}`);
      const tableData = new DescribeTableCommand({
        TableName: schema.default.TableName || '',
      });
      let response: any;
      try {
        response = await documentClient.send(tableData);
        console.log(response);
      } catch (error) {
        if (error?.name === 'ResourceNotFoundException') {
          await documentClient.send(new CreateTableCommand(schema.default));
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

migrateDynamoDB();
