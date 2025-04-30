const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// Proper way to test connection
(async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log("✅ DynamoDB connected. Tables:", data.TableNames);
  } catch (err) {
    console.error("❌ DynamoDB connection failed:", err);
  }
})();

module.exports = docClient;
