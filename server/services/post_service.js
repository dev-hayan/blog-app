const { Op } = require("sequelize")
const db = require("../models/index")
const Posts = db.posts


async function createPosts(post) {
    return await Posts.create(post)
}

async function getAllPosts() {
    return await Posts.findAll()
}


async function findPostById(id) {
    return Posts.findByPk(id)
}

const getRejectedPosts = async () => await Posts.findAll({
    where: {
        reports: { [Op.gt]: 0 }
    }
})

module.exports = { getAllPosts, createPosts, findPostById,getRejectedPosts }