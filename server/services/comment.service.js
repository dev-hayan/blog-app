const db = require("../models/index")
const Comments = db.comment

const createComment = async (comment) => await Comments.create(comment)

const findComment = async (id) => await Comments.findByPk(id)

const findChildComments = async (id) => await Comments.findAll({
    where: {
        parentCommentId: id
    },
    order: [['createdAt', 'DESC']],
    include: [
        {
            model: db.attachment,
            where: { attachmenTableType: 'comment' }, // Filter attachments for comments
            required: false, // Include comments even if they don't have attachments

        },
        {
            model: db.comment,
            as: 'Replies',
        },
    ],
})

const findPostComments = async (id) => await Comments.findAll({
    where: {
        postId: id, parentCommentId: null
    },
    order: [['createdAt', 'DESC']], 
    include: [
        {
            model: db.attachment,
            where: { attachmenTableType: 'comment' }, // Filter attachments for comments
            required: false, // Include comments even if they don't have attachments

        },
        {
            model: db.comment,
            as: 'Replies',
        },
    ],
})


module.exports = { createComment, findComment, findChildComments, findPostComments }