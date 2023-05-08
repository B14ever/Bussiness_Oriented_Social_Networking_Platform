const jwt = require('jsonwebtoken');
require('dotenv').config()
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET);
};
module.exports = { createToken }