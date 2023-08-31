const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { isAdmin } = require("../middlewares/roles")
const { readAll, create, update, remove, confirmEmail, toggleModeratorRole } = require("../controllers/users.controller")


router.get("/", auth, isAdmin, readAll)
router.post("/", create)
router.put("/:id", auth, update)
router.get("/confirm/:token", confirmEmail)
router.delete("/:id", auth, remove)
router.patch("/:id/toggleRole", auth, toggleModeratorRole)


module.exports = router