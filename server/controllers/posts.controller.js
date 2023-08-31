const { createPosts, findPostById, getAllPosts, getPendingPost, getReportedPosts, getApprovedPost } = require("../services/post.service")
const { validatePosts, validateUpdatePostConetnt } = require("../utils/requestValidations")
const { findUserById } = require("../services/user.service")
const { addMultiAttachments, deleteAttachments, getAttachments } = require("../services/attachment.service")
const cloudinary = require("../config/cloudinary.config")
const { findSuggestion } = require("../services/suggestions.service")
const { hasLike, addLike } = require("../services/likes.service")
const { addReport, hasReport } = require("../services/reports.service")

exports.create = async (req, res) => {
    const { error } = validatePosts(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await findUserById(req.body.userId)
    if (!user)
        return res.status(404).send("User not found.")
    try {
        const { content, userId } = req.body
        const { files } = req
        const attachments = []
        const post = await createPosts({ content, likes: 0, reports: 0, userId, userName: user.lastName })
        if (files) {
            for (const file of files) {
                const upload = await cloudinary.v2.uploader.upload(file.path)
                attachments.push({
                    url: upload.secure_url, attachmenTableId: post.id, attachmenTableType: "post"
                })
            }
            await addMultiAttachments(attachments)
        }
        return res.status(200).send(post)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
}

exports.remove = async (req, res) => {
    const post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    try {
        await post.destroy()
        return res.status(200).send("post deleted")
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

exports.readAll = async (req, res) => {
    const posts = await getAllPosts();
    if (!posts) return res.status(400).send("Posts not found")

    res.status(200).send(posts);

}

exports.readApproved = async (req, res) => {
    const posts = await getApprovedPost();
    if (!posts) return res.status(400).send("Posts not found")

    res.status(200).send(posts);

}

exports.readPending = async (req, res) => {
    const posts = await getPendingPost();
    if (!posts) return res.status(400).send("Posts not found")

    res.status(200).send(posts);

}

exports.readReported = async (req, res) => {
    const posts = await getReportedPosts();
    if (!posts) return res.status(400).send("Posts not found")

    res.status(200).send(posts);
}



exports.patch = async (req, res) => {
    let post = await findPostById(req.params.id)
    console.log(post)
    if (!post) return res.status(400).send("Post not found")

    const { action } = req.body
    switch (action) {
        case "like":
            const { userId, typeId, type } = req.body
            const like = await hasLike(userId, typeId, type);
            if (like) return res.status(400).send("You have already liked")

            try {

                await addLike({ userId, typeId, type })
                post.likes += 1
                post = await post.save()
                return res.status(200).send(post)

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
                    post.reports += 1
                    post = await post.save()
                    return res.status(200).send(post)

                } catch (error) {
                    return res.status(400).send(error.message)
                }
            }
            break;

        case "approve":
            if (req.user.isAdmin || req.user.isModerator) {
                try {
                    post.isApproved = true
                    post = await post.save()
                    return res.status(200).send(post)
                } catch (error) {
                    return res.status(400).send(error.message)
                }
            } else {
                return res.status(403).send("Access Denied.Not enough permissions");
            }
            break;

        case "toggelStatus":
            if (req.user.isAdmin) {
                try {

                    post.isApproved = !post.isApproved
                    post = await post.save()
                    return res.status(200).send(post)

                } catch (error) {
                    return res.status(400).send(error.message)
                }
            } else {
                return res.status(403).send("Access Denied.Not enough permissions");
            }
            break;

        case "updateContent":
            const { error } = validateUpdatePostConetnt(req.body)
            if (error) return res.status(400).send(error.details[0].message)

            const { content, suggestionId } = req.body
            let suggestion = await findSuggestion(suggestionId)
            if (!suggestion) return res.status(400).send("Suggestion not found")

            try {

                post.content = content
                post = await post.save()

                suggestion.isReplaced = true
                await suggestion.save()

                return res.status(200).send({ post: { ...post.toJSON() }, suggestion: { ...suggestion.toJSON() } })

            } catch (error) {
                return res.status(400).send(error.message)
            }
            break;

        default:
            return res.status(400).send("Invalid action");
            break;
    }

}
