const user = require("../modules/users/router")
const post = require("../modules/posts/router")
const comment = require("../modules/comments/router")
const suggestion = require("../modules/suggestions/router")
const errorMiddleware = require("../middlewares/error")
const auth = require("../modules/authentication/router")


module.exports = function (app) {
    app.use('/api/login',auth)
    app.use("/api/users", user)
    app.use("/api/posts", post)
    app.use("/api/comments", comment)
    app.use("/api/suggestions", suggestion)
    app.use(errorMiddleware)
}