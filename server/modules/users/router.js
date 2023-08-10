const express = require('express')
const router = express.Router()
const { getAllUsers, createUser, updateUser, deletUser } = require("./users.controller")


router.get("/", getAllUsers)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deletUser)


module.exports = router;