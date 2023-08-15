require('express-async-errors')
const express = require("express")
const app = express()

require("./startup/app")(app)
require("./routes/routes")(app)

const db = require("./models/index")
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.")
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message)
    })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
