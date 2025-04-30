const express = require("express");
const router = express.Router();
const { createBook } = require("../services/books");
const { getAllBooks } = require("../services/books");

// Create Book API
router.post("/", async (req, res) => {
  const { book_id, title, author } = req.body;
  try {
    await createBook(book_id, title, author);
    res.status(201).json({ message: "Book created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Books API
router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
