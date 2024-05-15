import { SearchKolDto } from './kol.dto';
export const makeSearchQuery = (query: SearchKolDto) => {
  try {
    const { name, platform, sex } = query;
    const params = {
      TableName: 'Kol',
    };
    let KeyConditionExpression = '';
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    let FilterExpression = '';
    if (name) {
      params['IndexName'] = 'name-platform-index';
      KeyConditionExpression = `#name = :name`;
      ExpressionAttributeNames['#name'] = 'name';
      ExpressionAttributeValues[':name'] = { S: name };
      if (platform) {
        KeyConditionExpression = `${KeyConditionExpression} and #platform = :platform`;
        ExpressionAttributeNames['#platform'] = 'platform';
        ExpressionAttributeValues[':platform'] = { S: platform };
      }
      if (sex) {
        FilterExpression = `#sex = :sex`;
        ExpressionAttributeNames['#sex'] = 'sex';
        ExpressionAttributeValues[':sex'] = { S: sex };
      }
    } else if (platform && sex) {
      params['IndexName'] = 'platform-followers-index';
      KeyConditionExpression = `#platform = :platform`;
      ExpressionAttributeNames['#platform'] = 'platform';
      ExpressionAttributeValues[':platform'] = { S: platform };
      FilterExpression = `#sex = :sex`;
      ExpressionAttributeNames['#sex'] = 'sex';
      ExpressionAttributeValues[':sex'] = { S: sex };
    } else {
      if (platform) {
        params['IndexName'] = 'platform-index';
        KeyConditionExpression = `#platform = :platform`;
        ExpressionAttributeNames['#platform'] = 'platform';
        ExpressionAttributeValues[':platform'] = { S: platform };
      }
      if (sex) {
        params['IndexName'] = 'sex-followers-index';
        KeyConditionExpression = `#sex = :sex`;
        ExpressionAttributeNames['#sex'] = 'sex';
        ExpressionAttributeValues[':sex'] = { S: sex };
      }
    }
    return {
      ...params,
      KeyConditionExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      FilterExpression,
    };
  } catch (error) {
    throw error;
  }
};
