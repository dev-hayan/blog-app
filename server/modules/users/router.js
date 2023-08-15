const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const isAdmin = require("../../middlewares/admin")
const { getAllUsers, createUser, updateUser, deletUser, confirmEmail } = require("./users.controller")


router.get("/", auth, isAdmin, getAllUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.get("/confirm/:token", confirmEmail)
router.delete("/:id", deletUser)


module.exports = router