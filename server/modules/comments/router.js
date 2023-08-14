const express = require('express')
const router = express.Router()
const { createComment, deleteComment, likeComment, reportComment } = require('./comments_controller')
const { uploader } = require("../../config/cloudinary.config")

router.post("/", uploader.array("files", 10), createComment)
router.patch("/:id/like", likeComment)
router.patch("/:id/report", reportComment)
router.delete("/:id", deleteComment)

module.exports = router