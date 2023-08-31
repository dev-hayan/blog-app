const jwt = require('jsonwebtoken');
require("dotenv").config()

const getToken = (payload) => jwt.sign(payload, process.env.JWT_PRIVATE_KEY)
const verifyToken = (token) => jwt.verify(token, process.env.JWT_PRIVATE_KEY)

module.exports = { getToken, verifyToken }