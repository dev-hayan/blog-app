const jwt = require('jsonwebtoken')
const { verifyToken } = require('../services/jwt.service')
require('dotenv').config()

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token")
  console.log("token", token)
  if (!token) return res.status(401).send('Access denied. No token provided')

  try {
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch (ex) {
    res.status(401).send("Invalid Token. Access denied")
  }
}
