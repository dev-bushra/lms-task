require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

// Setup client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// Get timestamp for 6 months ago
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const sixMonthsTimestamp = sixMonthsAgo.toISOString();

async function getTopBorrowedBooks() {
  const params = {
    TableName: "Library",
    IndexName: "GSI1", // Must match the name of your GSI
    KeyConditionExpression: "EntityType = :loan AND borrowed_at > :date",
    ExpressionAttributeValues: {
      ":loan": "Loan",
      ":date": sixMonthsTimestamp,
    },
  };

  try {
    const data = await docClient.send(new QueryCommand(params));
    const counts = {};

    for (const item of data.Items) {
      const bookId = item.book_id || item.PK;
      counts[bookId] = (counts[bookId] || 0) + 1;
    }

    const topBooks = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    console.log("Top 5 Borrowed Books in Last 6 Months:");
    topBooks.forEach(([bookId, count], index) => {
      console.log(`${index + 1}. ${bookId} - ${count} times`);
    });
  } catch (err) {
    console.error("Error querying:", err);
  }
}

getTopBorrowedBooks();
