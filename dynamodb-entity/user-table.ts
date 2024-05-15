import { CreateTableInput } from '@aws-sdk/client-dynamodb';
const userTableSchema: CreateTableInput = {
  TableName: 'User',
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  DeletionProtectionEnabled: false,
  BillingMode: 'PROVISIONED',
  ProvisionedThroughput: {
    ReadCapacityUnits: Number('5'), // required
    WriteCapacityUnits: Number('5'), // required
  },
};

export default userTableSchema;
