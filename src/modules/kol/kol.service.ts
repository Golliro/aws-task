import { Injectable } from '@nestjs/common';
import { documentClient, marshall, unmarshall } from '@libs/dynamodb-lib';
import {
  PutItemCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
  UpdateItemCommandInput,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  DeleteKolDto,
  CreateKolDto,
  SearchKolDto,
  UpdateKolDto,
} from './kol.dto';
import { v4 as uuidv4 } from 'uuid';
import { makeSearchQuery } from './kol.helper';
@Injectable()
export class KolService {
  private async scanKolData(params: ScanCommandInput) {
    try {
      let result = [];
      do {
        const { Items, LastEvaluatedKey } = await documentClient.send(
          new ScanCommand(params),
        );
        result = [...result, ...Items.map((item) => unmarshall(item))];
        params['ExclusiveStartKey'] = LastEvaluatedKey;
      } while (params['ExclusiveStartKey'] !== undefined);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async createKol(body: CreateKolDto) {
    const item = {
      ...body,
      id: uuidv4(),
      status: 'active',
    };
    const params = {
      TableName: 'Kol',
      Item: marshall(item),
    };
    try {
      await documentClient.send(new PutItemCommand(params));
      return item;
    } catch (error) {
      throw error;
    }
  }
  async searchKol(body: SearchKolDto) {
    const params = makeSearchQuery(body);
    console.log('params :', JSON.stringify(params));
    if (params?.['indexName'] === undefined) {
      return await this.scanKolData(params);
    }
    try {
      let result = [];
      do {
        const { Items, LastEvaluatedKey } = await documentClient.send(
          new QueryCommand(params),
        );
        result = [...result, ...Items.map((item) => unmarshall(item))];
        params['ExclusiveStartKey'] = LastEvaluatedKey;
      } while (params['ExclusiveStartKey'] !== undefined);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateKol(body: UpdateKolDto) {
    const attributeUpdates = Object.keys(body).reduce((acc, key) => {
      if (key !== 'id') {
        if (Array.isArray(body[key])) {
          acc[key] = {
            Action: 'PUT',
            Value: { L: marshall(body[key]) },
          };
        } else {
          acc[key] = {
            Action: 'PUT',
            Value: marshall(body[key]),
          };
        }
      }
      return acc;
    }, {});
    console.log(JSON.stringify(attributeUpdates));
    const params: UpdateItemCommandInput = {
      TableName: 'Kol',
      Key: {
        id: { S: body.id },
      },
      AttributeUpdates: attributeUpdates,
      ReturnValues: 'ALL_NEW',
    };
    try {
      const updatedItem = await documentClient.send(
        new UpdateItemCommand(params),
      );
      return unmarshall(updatedItem.Attributes);
    } catch (error) {
      throw error;
    }
  }
  async deleteKol(body: DeleteKolDto) {
    const params: UpdateItemCommandInput = {
      TableName: 'Kol',
      Key: {
        id: { S: body.id },
      },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': { S: 'Inactive' },
      },
      ReturnValues: 'ALL_NEW',
    };
    try {
      const updatedItem = await documentClient.send(
        new UpdateItemCommand(params),
      );
      return unmarshall(updatedItem.Attributes);
    } catch (error) {
      throw error;
    }
  }
}
