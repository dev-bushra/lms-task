require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');
const analyticsRoutes = require('./routes/analytics');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
