const { findUserByEmail } = require("../services/user.service")
const { validateAuthReq } = require("../utils/requestValidations")
const bcrypt = require("bcrypt")

exports.authenticateUser = async (req, res) => {
    const { error } = validateAuthReq(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, password } = req.body
    let user = await findUserByEmail(email)
    if (!user) return res.status(400).send("Invalid email or password")

    if (!user.isEmailConfirmed) return res.status(400).send("Please Confirm your Email")

    if (user.loginAttempts >= 5) {
        const now = new Date();
        if (user.disableLoginUntil > now) {
            const minutesRemaining = Math.ceil((user.disableLoginUntil - now) / (1000 * 60));
            return res.status(400).send(`Login is disabled. Try again in ${minutesRemaining} minutes.`);
        } else {
            user.loginAttempts = 0;
        }
    }
    const authResult = await bcrypt.compare(password, user.password)
    
    if (!authResult) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 5) {
            const now = new Date();
            user.disableLoginUntil = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
        }
        await user.save();
        return res.status(400).send("Invalid email or password")
    }

    user.loginAttempts = 0;
    await user.save();

    const token = user.genAuthToken()
    return res.status(200).send(token)
}
