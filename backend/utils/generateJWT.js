const jwt = require('jsonwebtoken');

const generateJWT = (userId, role) => {
    return jwt.sign({ user_id: userId, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateJWT };
