const { getAllPosts, createPosts, findPostById } = require("../../services/post_service");
const db = require("../../models/index");
const { validatePosts } = require("../../utils/request_validations");
const Posts = db.posts;
const cloudinary = require('cloudinary');
const { findUserById } = require("../../services/user_service");
const { addAttachment, addMultiAttachments, deleteAttachments } = require("../../services/attachment_service");
const multer = require("multer");
require('dotenv').config();



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});


exports.createPost = async (req, res) => {
    const { error } = validatePosts(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await findUserById(req.body.userId);
    if (!user)
        return res.status(404).send("User not found.");
    try {
        const { content, userId } = req.body;
        const { files } = req;
        const response = {};
        const attachments = [];
        const post = await createPosts({ content, likes: 0, reports: 0, userId })
        if (files) {
            for (const file of files) {
                const upload = await cloudinary.v2.uploader.upload(file.path);
                attachments.push({
                    url: upload.secure_url, attachmenTableId: post.id, attachmenTableType: "post"
                });
            }
            response.attachment = await addMultiAttachments(attachments);
        }
        response.post = post;
        return res.status(200).send(response);
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message);
    }
}


exports.deletePost = async (req, res) => {
    const post = await findPostById(req.params.id);
    console.log(post)
    if (!post) return res.status(400).send("Post no found");

    try {
        await deleteAttachments(post.id, "post")
        await post.destroy();
        return res.status(200).send("post deleted")
    } catch (error) {
        return res.status(400).send(error.message);
    }

}


