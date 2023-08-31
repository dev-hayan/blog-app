const { findPostById } = require("../services/post.service")
const { createSuggestions, findUserPostSuggestions, findSuggestion, findUserSuggestions, findAllSuggestion } = require("../services/suggestions.service")
const { findUserById } = require("../services/user.service")
const { valiadateSuggestion } = require("../utils/requestValidations")

exports.create = async (req, res) => {
    console.log(req.body)
    const { error } = valiadateSuggestion(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { content, userId, postId } = req.body
    const user = await findUserById(userId)
    if (!user)
        return res.status(404).send("User not found.")
    const post = await findPostById(postId)
    if (!post)
        return res.status(404).send("Post not found.")

    try {
        const suggestion = await createSuggestions({ content, userId, postId, post_user_id: post.userId })
        res.status(200).send(suggestion)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.readPostSuggestions = async (req, res) => {
    const post = await findPostById(req.params.id)
    if (!post)
        return res.status(404).send("Post not found.")

    try {
        const suggestions = await post.PostSuggestions()
        return res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)

    }
}

exports.readUserSuggestions = async (req, res) => {
    const user = await findUserById(req.params.id)
    if (!user)
        return res.status(404).send("User not found.")
    try {
        const suggestions = await findUserSuggestions(req.params.id)
        res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.readUserPostSuggestions = async (req, res) => {
    try {
        const suggestions = await findUserPostSuggestions(req.params.id)
        return res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.removePostSuggestion = async (req, res) => {
    const post = await findPostById(req.params.id)
    if (!post) return res.status(400).send("Post not found")

    try {
        await post.removePostSuggestions()
        return res.status(200).send("Attachments deleted")
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.patch = async (req, res) => {
    let suggestion = await findSuggestion(req.params.id)
    if (!suggestion) return res.status(400).send("Suggestion not found")

    const { action } = req.body
    switch (action) {
        case "reject":
            try {
                suggestion.isRejected = true
                suggestion = await suggestion.save()
                return res.status(200).send(suggestion)
            } catch (error) {
                return res.status(400).send(error.message)
            }
            break;

        case "reply":
            {
                const { content } = req.body
                try {
                    suggestion.reply = content
                    suggestion = await suggestion.save()
                    return res.status(200).send(suggestion)
                } catch (error) {
                    return res.status(400).send(error.message)
                }
            }
            break;
        default:
            break;
    }

}
exports.readAll = async (req, res) => {
    try {
        const suggestions = await findAllSuggestion()
        return res.status(200).send(suggestions)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.remove = async (req, res) => {
    let suggestion = await findSuggestion(req.params.id)
    if (!suggestion) return res.status(400).send("Suggestion not found")
    try {
        await suggestion.destroy()
        return res.status(200).send("suggestion Deletd")
    } catch (error) {
        return res.status(400).send(error.message)

    }
}