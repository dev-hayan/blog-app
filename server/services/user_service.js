const db = require("../models/index")
const { func } = require("joi")
const Users = db.users

const createUser = async user => await Users.create(user)

const getUsers = async () => await Users.findAll()

const findUserByEmail = async (email) => await Users.findOne({
    where: { email }
})

const findUserById = async (id) => Users.findByPk(id)

module.exports = { getUsers, findUserByEmail, createUser, findUserById }