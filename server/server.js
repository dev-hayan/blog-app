require('express-async-errors')
const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: process.env.OPTIONSSUCCESSSTATUS,
}))

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,x-auth-token')
    return next()
})

require("./routes")(app)
const db = require("./models/index")

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.")
    })
    .catch(err => {
        console.log("Failed to sync db: " + err.message)
    })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
