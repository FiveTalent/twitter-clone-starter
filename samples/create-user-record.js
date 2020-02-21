/* eslint-disable-line */
const { DynamoDB } = require('aws-sdk');
const docClient = new DynamoDB.DocumentClient();
const ddb = new DynamoDB();

exports.handler = async (event, context, callback) => {
  const { email, sub } = event.request.userAttributes;

  const tableName = await getTableName('User');

  const params = {
    TableName: tableName,
    Item: {
      id: sub,
      name: email,
      handle: email,
      gravatar: email,
    },
  };

  try {
    await docClient.put(params)
      .promise()
      .then(res => console.log(res))
      .catch(err => console.error(err));

    callback(null, event);
  } catch (e) {
    callback(e);
  }
};

const getTableName = async prefix => {
  const { TableNames } = await ddb.listTables({}).promise();

  const tableName = TableNames.filter(table => {
    const [name, _apiId, env] = table.split('-');

    return name === prefix && env === process.env.ENV;
  });

  return tableName[0];
};
