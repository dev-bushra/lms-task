const express = require('express');
const { borrowBook, returnBook } = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Borrow a book
router.post('/borrow/:bookId', authMiddleware, borrowBook);

// Return a book
router.post('/return/:bookId', authMiddleware, returnBook);

module.exports = router;
