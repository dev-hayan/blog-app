const express = require('express')
const { read } = require('../controllers/attachments.controller')
const router = express.Router()

router.get("/", read)

module.exports = router