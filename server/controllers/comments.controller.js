const { valiadateComment } = require("../utils/requestValidations")
const cloudinary = require("../config/cloudinary.config")
const { findUserById } = require("../services/user.service")
const { findPostById } = require("../services/post.service")
const { createComment, findComment, findChildComments, findPostComments } = require("../services/comment.service")
const { addMultiAttachments, deleteAttachments } = require("../services/attachment.service")
const { addLike, hasLike } = require("../services/likes.service")
const { hasReport, addReport } = require("../services/reports.service")

exports.create = async (req, res) => {
    const { error } = valiadateComment(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { content, userId, postId, parentCommentId = null } = req.body
    const { files } = req
    const user = await findUserById(userId)

    if (!user) return res.status(404).send("User not found.")

    const post = await findPostById(postId)
    if (!post) return res.status(404).send("Post not found.")

    if (parentCommentId) {
        const parentComment = await findComment(parentCommentId)
        if (!parentComment) return res.status(404).send("Parent comment not found.")
        else {
            parentComment.replied = true
            await parentComment.save()
        }
    }
    let attachments = []
    try {
        const comment = await createComment({ content, likes: 0, reports: 0, userId, postId, parentCommentId, userName: user['lastName'] })
        if (files) {
            for (const file of files) {
                const upload = await cloudinary.v2.uploader.upload(file.path)
                attachments.push({
                    url: upload.secure_url, attachmenTableId: comment.id, attachmenTableType: "comment"
                })
            }

            console.log('-> ', attachments)
            if (attachments.length) attachments = await addMultiAttachments(attachments)
        }
        const responseObj = {
            ...comment.toJSON(),
            attachments: attachments,
            Replies: []
        };

        return res.status(200).send(responseObj)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


exports.remove = async (req, res) => {
    const comment = await findComment(req.params.id)
    if (!comment) return res.status(400).send("Comment not found")
    const postId = comment.postId;

    try {
        await comment.destroy()
        const comments = await findPostComments(postId)
        res.status(200).send(comments);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.patch = async (req, res) => {
    let comment = await findComment(req.params.id)
    if (!comment) return res.status(400).send("Comment not found")

    const { action } = req.body
    switch (action) {
        case "like":
            const { userId, typeId, type } = req.body
            const like = await hasLike(userId, typeId, type);
            if (like) return res.status(400).send("You have already liked")

            try {
                await addLike({ userId, typeId, type })
                comment.likes += 1
                comment = await comment.save()
                return res.status(200).send(comment)
            } catch (error) {
                return res.status(400).send(error.message)
            }
            break;

        case "report":
            {
                const { userId, typeId, type } = req.body
                const report = await hasReport(userId, typeId, type);
                if (report) return res.status(400).send("You have already reported")


                try {
                    await addReport({ userId, typeId, type })
                    comment.reports += 1
                    comment = await comment.save()
                    return res.status(200).send(comment)
                } catch (error) {
                    return res.status(400).send(error.message)
                }
            }
            break;
        default:
            break;
    }

}

exports.readChild = async (req, res) => {
    const comment = await findComment(req.params.id)
    if (!comment) return res.status(400).send("Comment not found")

    const comments = await findChildComments(req.params.id)
    if (!comment) return res.status(400).send("Child Comments not found")

    return res.status(200).send(comments)
}

exports.readPost = async (req, res) => {
    const post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")
    const comments = await findPostComments(req.params.id)
    if (!comments) return res.status(400).send("Comments not found")
    res.status(200).send(comments);
}



