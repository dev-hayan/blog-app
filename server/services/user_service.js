const { hashSync } = require("bcrypt");
const db = require("../models/index");
const { func } = require("joi");
const Users = db.users;

async function createUser(user) {
    return await Users.create(user)
}

async function getUsers() {
    return await Users.findAll();
}


async function findUserByEmail(email) {
    return await Users.findOne({
        where: { email }
    });

}

async function findUserById(id) {
    return Users.findByPk(id);
}

module.exports = { getUsers, findUserByEmail, createUser, findUserById }