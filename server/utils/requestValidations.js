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

module.exports.validateUsers = validateUsers