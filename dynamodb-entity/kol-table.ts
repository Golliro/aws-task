import { CreateTableInput } from '@aws-sdk/client-dynamodb';

// {
//   "Name": "Ninejoe Ninejoe",
//   "Platform": "Facebook",
//   "Sex": "Male",
//   "Categories":[ "Lifestyle"],
//   "Tel": "0998935365",
//   "Link": "https://www.facebook.com/tsomton?mibextid=LQQJ4d",
//   "Followers": "7900",
//   "Photo Cost / Kols": 800,
//   "VDO Cost / Kols": "1000",
//   "ER%": "2.12"
// }

const kolTableSchema: CreateTableInput = {
  TableName: 'Kol',
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
    {
      AttributeName: 'name',
      AttributeType: 'S',
    },
    {
      AttributeName: 'platform',
      AttributeType: 'S',
    },
    {
      AttributeName: 'followers',
      AttributeType: 'N',
    },
    {
      AttributeName: 'sex',
      AttributeType: 'S',
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'platform-followers-index',
      KeySchema: [
        {
          AttributeName: 'platform',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'followers',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: Number('5'), // required
        WriteCapacityUnits: Number('5'), // required
      },
    },
    {
      IndexName: 'sex-followers-index',
      KeySchema: [
        {
          AttributeName: 'sex',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'followers',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: Number('5'), // required
        WriteCapacityUnits: Number('5'), // required
      },
    },
    {
      IndexName: 'name-platform-index',
      KeySchema: [
        {
          AttributeName: 'name',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'platform',
          KeyType: 'RANGE',
        },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: Number('5'), // required
        WriteCapacityUnits: Number('5'), // required
      },
    },
  ],
  DeletionProtectionEnabled: false,
  BillingMode: 'PROVISIONED',
  ProvisionedThroughput: {
    ReadCapacityUnits: Number('5'), // required
    WriteCapacityUnits: Number('5'), // required
  },
};

export default kolTableSchema;
