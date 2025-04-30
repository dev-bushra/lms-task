const express = require("express");
const router = express.Router();
const { borrowBook } = require("../services/loans");
const { returnBook } = require("../services/loans");

// Return Book API
router.post("/return", async (req, res) => {
  const { user_id, book_id } = req.body;

  try {
    await returnBook(user_id, book_id);
    res.status(200).json({ message: "Book returned" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrow Book API
router.post("/borrow", async (req, res) => {
  const { user_id, book_id } = req.body;

  try {
    await borrowBook(user_id, book_id);
    res.status(201).json({ message: "Book borrowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Users
// routes/loans.js
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const params = {
    TableName: "Library",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    FilterExpression: "attribute_not_exists(returnDate)",
    ExpressionAttributeValues: {
      ":pk": `USER#${userId}`,
      ":sk": "LOAN#",
    },
  };

  try {
    const data = await dynamoClient.query(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
    const params = {
      TableName: 'Library',
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':sk': 'LOAN#'
      }
    };
  
    try {
      const data = await dynamoClient.query(params).promise();
      res.json(data.Items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
