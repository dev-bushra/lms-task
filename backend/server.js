const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');
const pool = require('./db'); 
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json()); 

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected: ', result.rows[0]);
    res.status(200).send('LMS is working');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Error: Could not connect to the database');
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
