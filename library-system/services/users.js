const docClient = require("../db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

async function createUser(user_id, name, email) {
  const params = {
    TableName: "Library",
    Item: {
      PK: `USER#${user_id}`,
      SK: `PROFILE`,
      name,
      email,
      EntityType: "User",
    },
  };
  await docClient.send(new PutCommand(params));
}

module.exports = { createUser };
