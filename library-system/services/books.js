const docClient = require("../db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

// Create Book
async function createBook(book_id, title, author) {
  const params = {
    TableName: "Library",
    Item: {
      PK: `BOOK#${book_id}`,
      SK: `PROFILE`,
      title,
      author,
      EntityType: "Book",
    },
  };
  await docClient.send(new PutCommand(params));
}

// Get Books
async function getAllBooks() {
  const params = {
    TableName: "Library",
    FilterExpression: "begins_with(PK, :pk) AND SK = :sk",
    ExpressionAttributeValues: {
      ":pk": "BOOK#",
      ":sk": "PROFILE"
    }
  };

  const result = await docClient.send(new ScanCommand(params));
  return result.Items;
}


module.exports = { createBook, getAllBooks };
