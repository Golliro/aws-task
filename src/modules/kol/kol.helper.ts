import { SearchKolDto } from './kol.dto';
import { isUndefined, omitBy } from 'lodash';
import { ScanCommandInput, QueryInput } from '@aws-sdk/client-dynamodb';
export const makeSearchQuery = (
  query: SearchKolDto,
): ScanCommandInput | QueryInput => {
  try {
    const { name, platform, sex } = query;
    console.log('query : ', query);
    const params = {
      TableName: 'Kol',
    };
    const KeyConditions = {};
    const QueryFilter = {
      status: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{ S: 'active' }],
      },
    };
    if (name) {
      params['IndexName'] = 'name-platform-index';
      KeyConditions['name'] = {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{ S: name }],
      };
      if (platform) {
        KeyConditions['platform'] = {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{ S: platform }],
        };
      }
      if (sex) {
        QueryFilter['sex'] = {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{ S: sex }],
        };
      }
    } else if (platform && sex) {
      params['IndexName'] = 'platform-followers-index';
      KeyConditions['platform'] = {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{ S: platform }],
      };
      if (sex) {
        QueryFilter['sex'] = {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{ S: sex }],
        };
      }
    } else if (platform) {
      params['IndexName'] = 'platform-followers-index';
      KeyConditions['platform'] = {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{ S: platform }],
      };
    } else if (sex) {
      params['IndexName'] = 'sex-followers-index';
      KeyConditions['sex'] = {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{ S: sex }],
      };
    } else {
      return {
        ...params,
        ScanFilter: {
          status: {
            ComparisonOperator: 'EQ',
            AttributeValueList: [{ S: 'active' }],
          },
        },
      } as ScanCommandInput;
    }

    const omitUndefiend = omitBy(
      {
        ...params,
        KeyConditions,
        QueryFilter,
      },
      isUndefined,
    );
    return omitUndefiend as QueryInput;
  } catch (error) {
    throw error;
  }
};
