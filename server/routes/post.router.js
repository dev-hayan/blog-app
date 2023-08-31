const express = require('express')
const { create, remove, like, report, approve, readAll, updateContent, readPending, readReported, toggelStatus, readApproved, patch } = require('../controllers/posts.controller')
const auth = require('../middlewares/auth')
const { isModerator } = require("../middlewares/roles")
const { isAdmin } = require("../middlewares/roles")
const uploader = require('../services/multer.service')
const router = express.Router()

router.get("/", auth, readAll)
router.get("/reported", auth, readReported)
router.get("/pending", auth, readPending)
router.get("/approvedPosts", auth, readApproved)
router.post("/", uploader.array("files", 5), create)
router.patch("/:id", auth, patch)
router.delete("/:id", auth, remove)

module.exports = router