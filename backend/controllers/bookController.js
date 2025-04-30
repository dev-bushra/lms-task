const pool = require('../db');

// Create a new book (Admin only)
const createBook = async (req, res) => {
    const { title, description, author, availability_status } = req.body;
    
    const newBook = await pool.query(
        'INSERT INTO books (title, description, author, availability_status) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, author, availability_status]
    );

    res.status(201).json(newBook.rows[0]);
};

// Get all books (User)
const getBooks = async (req, res) => {
    const books = await pool.query('SELECT * FROM books');
    res.json(books.rows);
};

// Update a book (Admin only)
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, description, author, availability_status } = req.body;

    const updatedBook = await pool.query(
        'UPDATE books SET title = $1, description = $2, author = $3, availability_status = $4 WHERE book_id = $5 RETURNING *',
        [title, description, author, availability_status, id]
    );

    res.json(updatedBook.rows[0]);
};

// Delete a book (Admin only)
const deleteBook = async (req, res) => {
    const { id } = req.params;

    await pool.query('DELETE FROM books WHERE book_id = $1', [id]);

    res.status(204).send();
};

module.exports = { createBook, getBooks, updateBook, deleteBook };
