const { findUserByEmail } = require("../../services/user_service")
const { validateAuthReq } = require("../../utils/request_validations")
const bcrypt = require("bcrypt")

exports.authenticateUser = async (req, res) => {
    const { error } = validateAuthReq(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, password } = req.body
    let user = await findUserByEmail(email)
    if (!user) return res.status(400).send("Invalid email or password")

    const authResult = await bcrypt.compare(password, user.password)
    if (!authResult) return res.status(400).send("Invalid email or password")

    const token = user.genAuthToken()
    return res.status(200).send(token)
}