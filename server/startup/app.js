const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = function (app) {
    console.log("first")
    app.use(cors())
    app.use(bodyParser.json())
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,x-auth-token')
        return next()
    })
}