const pool = require('../db');

// Borrow a book
const borrowBook = async (req, res) => {
    const { bookId } = req.params;
    const { user_id } = req.user;  // From the authMiddleware

    // Check if book is available
    const book = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
    if (!book.rows.length || !book.rows[0].availability_status) {
        return res.status(400).json({ error: 'Book is not available' });
    }

    // Insert loan record
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);  // Due date in 14 days

    const loan = await pool.query(
        'INSERT INTO loans (user_id, book_id, borrowed_on, due_date) VALUES ($1, $2, NOW(), $3) RETURNING *',
        [user_id, bookId, dueDate]
    );

    // Update book availability
    await pool.query('UPDATE books SET availability_status = FALSE WHERE book_id = $1', [bookId]);

    res.json(loan.rows[0]);
};

// Return a book
const returnBook = async (req, res) => {
    const { bookId } = req.params;
    const { user_id } = req.user;

    // Check if the book was borrowed by the user
    const loan = await pool.query(
        'SELECT * FROM loans WHERE user_id = $1 AND book_id = $2 AND status = $3',
        [user_id, bookId, 'borrowed']
    );

    if (!loan.rows.length) {
        return res.status(400).json({ error: 'You did not borrow this book' });
    }

    // Update loan record and book availability
    await pool.query('UPDATE loans SET status = $1, returned_on = NOW() WHERE loan_id = $2', ['returned', loan.rows[0].loan_id]);
    await pool.query('UPDATE books SET availability_status = TRUE WHERE book_id = $1', [bookId]);

    res.status(200).json({ message: 'Book returned successfully' });
};

module.exports = { borrowBook, returnBook };
