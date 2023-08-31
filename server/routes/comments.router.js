const express = require('express')
const router = express.Router()
const { create, remove, readChild, readPost, patch } = require('../controllers/comments.controller')
const uploader = require("../services/multer.service")
const auth = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/roles')

router.post("/", uploader.array("files", 5), create)

router.patch("/:id", auth, patch)
router.delete("/:id", auth, isAdmin, remove)
router.get("/:id/childComments", auth, readChild)
router.get("/post/:id", auth, readPost)

module.exports = router