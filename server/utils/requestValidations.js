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

function validateUpdateUsersRequest(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
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
        userId: Joi.string().required(),
        postId: Joi.string().required(),
        parentCommentId: Joi.string(),
    })
    return schema.validate(comment)
}

function valiadateSuggestion(suggestion) {
    console.log("suggestions: ", suggestion)
    const schema = Joi.object({
        content: Joi.string().required(),
        userId: Joi.string().required(),
        postId: Joi.string().required(),
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

function validateReplySuggestionReq(req) {
    const schema = Joi.object({
        content: Joi.string().required(),
    })
    return schema.validate(req)
}

function validateUpdatePostConetnt(req) {
    const schema = Joi.object({
        content: Joi.string().required(),
        suggestionId: Joi.required(),
        action: Joi.required()
    })
    return schema.validate(req)
}

function validateAddLikes(req) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        postId: Joi.required()
    })
    return schema.validate(req)
}

function validateReadAttachments(req) {
    const schema = Joi.object({
        id: Joi.string().required(),
        type: Joi.string().required()
    })
    return schema.validate(req)
}
module.exports = { validateUsers, validatePosts, valiadateComment, valiadateSuggestion, validateAuthReq, validateReplySuggestionReq, validateUpdatePostConetnt, validateUpdateUsersRequest, validateAddLikes, validateReadAttachments }