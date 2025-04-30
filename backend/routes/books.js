const express = require('express');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all books (for user)
router.get('/', getBooks);

// Admin routes (protected by authMiddleware)
router.post('/', authMiddleware, createBook); // Create a book
router.put('/:id', authMiddleware, updateBook); // Update a book
router.delete('/:id', authMiddleware, deleteBook); // Delete a book

module.exports = router;
