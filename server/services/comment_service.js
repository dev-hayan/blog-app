const db = require("../models/index")
const Comments = db.comments

async function createComment(comment) {
    return await Comments.create(comment)

}

async function findComment(id) {
    return await Comments.findByPk(id)
}

async function findComment(id) {
    return await Comments.findByPk(id)
}

module.exports = { createComment, findComment }