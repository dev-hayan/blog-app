const db = require("../models/index");
const Posts = db.posts;

async function createPosts(post) {
    return await Posts.create(post)
}

async function getAllPosts() {
    return await Posts.findAll();
}


async function findPostById(id) {
    return Posts.findByPk(id);
}

module.exports = { getAllPosts, createPosts, findPostById }