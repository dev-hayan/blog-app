const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const isAdmin = require("../../middlewares/admin")
const { getAllUsers, createUser, updateUser, deletUser } = require("./users.controller")


router.get("/", auth, isAdmin, getAllUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deletUser)


module.exports = router