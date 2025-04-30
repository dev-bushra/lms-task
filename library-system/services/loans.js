const docClient = require("../db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

// return book
const { QueryCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

async function returnBook(user_id, book_id) {
  // 1. Find latest unreturned loan
  const queryParams = {
    TableName: "Library",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": `USER#${user_id}`,
      ":skPrefix": `LOAN#${book_id}#`,
    },
    ScanIndexForward: false, // Sort DESC to get latest first
    Limit: 1,
  };

  const result = await docClient.send(new QueryCommand(queryParams));
  const loan = result.Items?.[0];

  if (!loan || loan.returned) {
    throw new Error("No active loan found for this book.");
  }

  // 2. Update the loan to set returned: true
  const updateParams = {
    TableName: "Library",
    Key: {
      PK: loan.PK,
      SK: loan.SK,
    },
    UpdateExpression: "SET returned = :true, returnedAt = :returnedAt",
    ExpressionAttributeValues: {
      ":true": true,
      ":returnedAt": new Date().toISOString(),
    },
  };

  await docClient.send(new UpdateCommand(updateParams));
}


// borrow book
async function borrowBook(user_id, book_id) {
  const borrowedAt = new Date().toISOString();
  const timestamp = Date.now();

  const params = {
    TableName: "Library",
    Item: {
      PK: `USER#${user_id}`,
      SK: `LOAN#${book_id}#${timestamp}`,
      book_id,
      borrowedAt,
      returned: false,
      EntityType: "Loan"
    },
  };

  await docClient.send(new PutCommand(params));
}

module.exports = { borrowBook, returnBook };
