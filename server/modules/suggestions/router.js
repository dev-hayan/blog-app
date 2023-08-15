const express = require('express')
const { createSuggestion, getPostSuggestions, getUserSuggestions, getUserPostSuggestion, rejcetSuggestion } = require('./suggestions_controller')
const router = express.Router()

router.post("/", createSuggestion)
router.get("/post/:id", getPostSuggestions)
router.get("/userSuggestions/:id", getUserSuggestions)
router.get("/userPostSuggestions/:id/", getUserPostSuggestion)
router.patch("/reject/:id", rejcetSuggestion);
module.exports = router