const Joi = require("joi")

function validateUsers(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        password: Joi.string().required(),
    })

    return schema.validate(user)
}
function validatePosts(post) {
    const schema = Joi.object({
        content: Joi.string().required(),
        userId: Joi.number().required(),
    })
    return schema.validate(post)
}

function valiadateComment(comment) {
    const schema = Joi.object({
        content: Joi.string().required(),
        userId: Joi.number().required(),
        postId: Joi.number().required(),
        parentCommentId: Joi.number(),
    })
    return schema.validate(comment)
}

function valiadateSuggestion(suggestion) {
    const schema = Joi.object({
        content: Joi.string().required(),
        userId: Joi.number().required(),
        postId: Joi.number().required(),
    })
    return schema.validate(suggestion)
}

function validateAuthReq(request) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().required(),
    })

    return schema.validate(request)
}

module.exports = { validateUsers, validatePosts, valiadateComment, valiadateSuggestion,validateAuthReq }