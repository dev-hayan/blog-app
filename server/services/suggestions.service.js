const db = require("../models/index")
const Suggestions = db.suggestion

const createSuggestions = (suggestion) => Suggestions.create(suggestion)

const findSuggestion = (id) => Suggestions.findByPk(id)

const findUserPostSuggestions = (id) => Suggestions.findAll({
    where: {
        post_user_id: id,
        isRejected: false,
        isReplaced: false
    },
    include: [
        {
            model: db.post,
            required: true
        }, {
            model: db.user,
            attributes: [['lastName', 'userName']], // Select the username attribute
        },
    ]
})

const findUserSuggestions = (id) => Suggestions.findAll({
    where: {
        userId: id,
    },
    include: [
        {
            model: db.post,
            required: true
        }, {
            model: db.user,
            attributes: [['lastName', 'userName']], // Select the username attribute
        },
    ]
})

const findAllSuggestion = async () => Suggestions.findAll()


module.exports = { createSuggestions, findSuggestion, findUserPostSuggestions, findUserSuggestions, findAllSuggestion }