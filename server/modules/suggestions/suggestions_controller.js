const { findPostById } = require("../../services/post_service");
const { createSuggestions, findUserPostSuggestions } = require("../../services/suggestions_service");
const { findUserById } = require("../../services/user_service");
const { valiadateSuggestion } = require("../../utils/request_validations");

exports.createSuggestion = async (req, res) => {
    console.log(req.body)
    const { error } = valiadateSuggestion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { content, userId, postId } = req.body;
    const user = await findUserById(userId);
    if (!user)
        return res.status(404).send("User not found.");
    const post = await findPostById(postId);
    if (!post)
        return res.status(404).send("Post not found.");

    try {
        const suggestion = await createSuggestions({ content, userId, postId, post_user_id: post.userId })
        res.status(200).send(suggestion)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getPostSuggestions = async (req, res) => {
    const post = await findPostById(req.params.id);
    if (!post)
        return res.status(404).send("Post not found.");

    try {
        const suggestions = await post.PostSuggestions();
        return res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)

    }
}

exports.getUserSuggestions = async (req, res) => {
    console.log("called")
    const user = await findUserById(req.params.id);
    if (!user)
        return res.status(404).send("User not found.");
    try {
        const suggestions = await user.getUserSuggestions();
        res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.getUserPostSuggestion = async (req, res) => {
    try {
        const suggestions = await findUserPostSuggestions(req.params.id)
        return res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.deletePostSuggestion = async (req, res) => {
    const post = await findPostById(req.params.id);
    console.log(post)
    if (!post) return res.status(400).send("Post not found");

    try {
        await post.removePostSuggestions()
        return res.status(200).send("Attachments deleted")
    } catch (error) {
        return res.status(400).send(error.message);
    }
}
