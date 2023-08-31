const db = require("../models/index")
const Users = db.user

const createUser = async user => Users.create(user)

const getUsers = async () => Users.findAll({
    where: {
        isAdmin: false
    }
})

const findUserByEmail = async (email) => Users.findOne({
    where: { email }
})

const findUserById = async (id) => Users.findByPk(id)

module.exports = { getUsers, findUserByEmail, createUser, findUserById }