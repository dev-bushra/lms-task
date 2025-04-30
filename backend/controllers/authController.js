const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../utils/hashPassword');
const { generateJWT } = require('../utils/generateJWT');

// User Registration
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert new user
    const newUser = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, role]
    );

    const token = generateJWT(newUser.rows[0].user_id, newUser.rows[0].role);
    res.status(201).json({ token });
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateJWT(user.rows[0].user_id, user.rows[0].role);
    // res.json({ token });
    res.json({
        token,
        user: {
          user_id: user.rows[0].user_id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
      });
};

module.exports = { register, login };
