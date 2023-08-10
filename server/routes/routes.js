const user = require("../modules/users/router")
const post = require("../modules/posts/router")
const errorMiddleware = require("../middlewares/error")

module.exports = function (app) {
    app.use("/api/users", user)
    app.use("/api/posts",post)
    app.use(errorMiddleware);
}