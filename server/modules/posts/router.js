const express = require('express')
const { createPost, deletePost, likePost, reportPost, approvePost } = require('./posts.controller')
const { uploader } = require("../../config/cloudinary.config")

const router = express.Router()



router.post("/", uploader.array("files", 10), createPost);
router.patch("/:id/like", likePost)
router.patch("/:id/report", reportPost)
router.patch("/:id/approve", approvePost)
router.delete("/:id", deletePost)

module.exports = router;