const user = require("../modules/users/router")
const errorMiddleware = require("../middlewares/error")

module.exports = function (app) {
    app.use("/api/users", user)
    app.use(errorMiddleware);
}