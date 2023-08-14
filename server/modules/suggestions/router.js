const express = require('express')
const { createSuggestion, getPostSuggestions, getUserSuggestions, getUserPostSuggestion } = require('./suggestions_controller')
const router = express.Router()

router.post("/", createSuggestion)
router.get("/post/:id", getPostSuggestions)
router.get("/userSuggestions/:id", getUserSuggestions)
router.get("/userPostSuggestions/:id/", getUserPostSuggestion)
module.exports = router