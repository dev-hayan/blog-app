const { valiadateComment } = require("../../utils/request_validations");
const { cloudinary } = require("../../config/cloudinary.config");
const { findUserById } = require("../../services/user_service");
const { findPostById } = require("../../services/post_service");
const { createComment, findComment } = require("../../services/comment_service");
const { addMultiAttachments, deleteAttachments } = require("../../services/attachment_service");

exports.createComment = async (req, res) => {
    const { error } = valiadateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log("first")
    const { content, userId, postId, parentCommentId = null } = req.body;
    const { files } = req;
    const user = await findUserById(userId);
    
    if (!user)
        return res.status(404).send("User not found.");
    const post = await findPostById(postId);
    if (!post)
        return res.status(404).send("Post not found.");

    if (parentCommentId) {
        const parentComment = await findComment(parentCommentId);
        if (!parentComment) return res.status(404).send("Parent comment not found.");
    }
    const response = {};
    const attachments = [];
    try {
        const comment = await createComment({ content, likes: 0, reports: 0, userId, postId, parentCommentId })
        if (files) {
            for (const file of files) {
                const upload = await cloudinary.v2.uploader.upload(file.path);
                attachments.push({
                    url: upload.secure_url, attachmenTableId: comment.id, attachmenTableType: "comment"
                });
            }
            response.attachment = await addMultiAttachments(attachments);
        }
        response.comment = comment;
        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


exports.deleteComment = async (req, res) => {
    const comment = await findComment(req.params.id);
    if (!comment) return res.status(400).send("Comment not found");

    try {
        await deleteAttachments(comment.id, "comment")
        await comment.destroy();
        return res.status(200).send("comment deleted")
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

exports.likeComment = async (req, res) => {
    let comment = await findComment(req.params.id);
    if (!comment) return res.status(400).send("Comment not found");

    try {
        comment.likes += 1;
        comment = await comment.save();
        return res.status(200).send(comment)
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

exports.reportComment = async (req, res) => {
    let comment = await findComment(req.params.id);
    if (!comment) return res.status(400).send("Comment not found");

    try {
        comment.reports += 1;
        comment = await comment.save();
         return res.status(200).send(comment)
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

