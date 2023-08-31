const db = require("../models/index")
const Likes = db.userLike

const hasLike = async (userId, typeId, type) => {
    const result = await Likes.findAll({ where: { userId: userId, typeId: typeId, type: type } })
    if (result.length === 0) return false
    else return true
}

const addLike = async (like) => Likes.create(like)

module.exports = { hasLike, addLike }