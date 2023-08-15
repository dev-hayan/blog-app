const express = require('express')
const { createPost, deletePost, likePost, reportPost, approvePost } = require('./posts.controller')
const { uploader } = require("../../config/cloudinary.config")
const auth = require('../../middlewares/auth')
const isModerator = require("../../middlewares/moderator")
const { getRejectedPosts } = require('../../services/post_service')
const router = express.Router()



router.post("/", uploader.array("files", 10), createPost)
router.patch("/:id/like", auth, likePost)
router.patch("/:id/report", auth, reportPost)
router.patch("/:id/approve", auth, isModerator, approvePost)
router.get("/rejected",getRejectedPosts)
router.delete("/:id",auth, deletePost)

module.exports = router