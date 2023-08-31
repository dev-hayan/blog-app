const user = require("./users.router")
const post = require("./post.router")
const comment = require("./comments.router")
const suggestion = require("./suggestion.router")
const errorMiddleware = require("../middlewares/error")
const auth = require("./authentication.router")
const attachment = require("./attachment.router")

module.exports = function (app) {
    app.use('/api/login', auth)
    app.use("/api/users", user)
    app.use("/api/posts", post)
    app.use("/api/comments", comment)
    app.use("/api/suggestions", suggestion)
    app.use("/api/attachments", attachment)
    app.use(errorMiddleware)
}