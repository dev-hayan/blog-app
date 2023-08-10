const Joi = require("joi")

function validateUsers(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        password: Joi.string().required(),
    })

    return schema.validate(user);
}
function validatePosts(post) {
    const schema = Joi.object({
        content: Joi.string().min(1).required(),
        userId: Joi.number().required(),
    })
    return schema.validate(post);
}

module.exports = { validateUsers, validatePosts }