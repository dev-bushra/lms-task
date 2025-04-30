const express = require('express');
const router = express.Router();
const { subMonths } = require('date-fns');
const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
const docClient = require('../db'); // 👈 This should be the document client

// Get most borrowed books
router.get('/top-books', async (req, res) => {
  const cutoffDate = subMonths(new Date(), 6).toISOString();

  // const params = {
  //   TableName: 'Library',
  //   FilterExpression: 'begins_with(SK, :sk) AND loanDate >= :cutoff',
  //   ExpressionAttributeValues: {
  //     ':sk': 'LOAN#',
  //     ':cutoff': cutoffDate
  //   }
  // };
  const params = {
    TableName: 'Library',
    FilterExpression: 'begins_with(SK, :sk) AND borrowed_at >= :cutoff',
    ExpressionAttributeValues: {
      ':sk': 'LOAN#',
      ':cutoff': cutoffDate
    }
  };
  

  try {
    const data = await docClient.send(new ScanCommand(params));
    const counts = {};

    for (const item of data.Items) {
      // const bookId = item.bookId;
      const bookId = item.book_id;
      counts[bookId] = (counts[bookId] || 0) + 1;
    }

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([bookId, count]) => ({ bookId, count }));

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
