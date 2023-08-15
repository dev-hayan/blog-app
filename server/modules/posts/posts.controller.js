const { createPosts, findPostById } = require("../../services/post_service")
const { validatePosts } = require("../../utils/request_validations")
const { findUserById } = require("../../services/user_service")
const { addMultiAttachments, deleteAttachments } = require("../../services/attachment_service")
const { cloudinary } = require("../../config/cloudinary.config")
const db = require("../../models/index")



exports.createPost = async (req, res) => {
    const { error } = validatePosts(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await findUserById(req.body.userId)
    if (!user)
        return res.status(404).send("User not found.")
    try {
        const { content, userId } = req.body
        const { files } = req
        const response = {}
        const attachments = []
        const post = await createPosts({ content, likes: 0, reports: 0, userId })
        if (files) {
            for (const file of files) {
                const upload = await cloudinary.v2.uploader.upload(file.path)
                attachments.push({
                    url: upload.secure_url, attachmenTableId: post.id, attachmenTableType: "post"
                })
            }
            response.attachment = await addMultiAttachments(attachments)
        }
        response.post = post
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}


exports.deletePost = async (req, res) => {
    const post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    try {
        await deleteAttachments(post.id, "post")
        await post.destroy()
        return res.status(200).send("post deleted")
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

exports.likePost = async (req, res) => {
    let post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    try {
        post.likes += 1
        post = await post.save()
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.reportPost = async (req, res) => {
    let post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    try {
        post.reports += 1
        post = await post.save()
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.approvePost = async (req, res) => {
    let post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    try {
        post.isApproved = true
        post = await post.save()
        return res.status(200).send(post)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


