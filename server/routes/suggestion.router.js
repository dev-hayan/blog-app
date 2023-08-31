const express = require('express')
const { create, readPostSuggestions, readUserSuggestions, readUserPostSuggestions, reject, reply, readAll, remove, patch } = require('../controllers/suggestions.controller')
const auth = require('../middlewares/auth')

const uploader = require('../services/multer.service')
const { isAdmin } = require('../middlewares/roles')
const router = express.Router()

router.post("/", auth, uploader.array("files", 5), create)
router.get("/user/:id", readUserSuggestions)
router.get("/userPost/:id/", auth, readUserPostSuggestions)
router.get("/", auth, readAll)
router.patch("/:id", auth, patch)
router.delete("/:id", auth, isAdmin, remove)

module.exports = router