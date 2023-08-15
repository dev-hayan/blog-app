const db = require("../models/index")
const Suggestions = db.suggestions

async function createSuggestions(suggestion) {
    return await Suggestions.create(suggestion)

}

async function findSuggestion(id) {
    return await Suggestions.findByPk(id)
}

async function findUserPostSuggestions(id) {
    return await Suggestions.findAll({
        where: {
            post_user_id: id,
        }
    })
}

module.exports = {  createSuggestions, findSuggestion, findUserPostSuggestions }