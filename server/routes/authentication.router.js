const express = require("express")
const { authenticateUser } = require("../controllers/authentication")
const router = express.Router()


router.post("/",authenticateUser)

module.exports = router