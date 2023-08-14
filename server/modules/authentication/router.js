const express = require("express")
const { authenticateUser } = require("./authentication")
const router = express.Router()


router.post("/",authenticateUser)

module.exports = router