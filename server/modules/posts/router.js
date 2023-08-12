const express = require('express')
const { createPost, uploader, deletePost } = require('./posts.controller')
const router = express.Router()



router.post("/", uploader.array("files", 10), createPost);
router.delete("/:id", deletePost)

module.exports = router;