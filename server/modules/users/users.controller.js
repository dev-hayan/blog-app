const { getUsers, findUserByEmail, createUser, findUserById } = require("../../services/user_service")
const { validateUsers } = require("../../utils/request_validations")
const jwt = require('jsonwebtoken');
const transporter = require('../../config/transport.config');
require("dotenv").config()


// ------------------------------------------------Get All Users----------------------------------------------------
exports.getAllUsers = async (req, res) => {
    try {
        const users = await getUsers()
        res.send(users)
    } catch (error) {
        res.status(400).send("Errors in fetching Users")
    }
}

// ------------------------------------------------Add New Users----------------------------------------------------
exports.createUser = async (req, res) => {
    const { error } = validateUsers(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, firstName, lastName, password } = req.body
    let newUser = await findUserByEmail(email)
    if (newUser) return res.status(400).send("User already exists")

    try {
        const confirmationToken = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY);

        const confirmationLink = `http://localhost:5000/api/users/confirm/${confirmationToken}`; // Replace with your frontend URL
        const mailOptions = {
            from: 'abdulhayan1220@gmail.com',
            to: email,
            subject: 'Confirm Email',
            html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
        };
        newUser = await createUser({ email, firstName, lastName, password, isAdmin: false, isModerator: false })
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        return res.status(200).send(newUser)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.confirmEmail = async (req, res) => {
    const token = req.params.token;
    try {
        const { email } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const user = await findUserByEmail(email);
        if (!user) throw new Error('User not found');

        // Update user's email confirmation status in the database
        user.isEmailConfirmed = true;
        await user.save();

        res.status(200).send('Email confirmed successfully.');
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
}

// ------------------------------------------------Update Users----------------------------------------------------
exports.updateUser = async (req, res) => {
    const user = await findUserById(req.params.id)
    if (!user)
        return res.status(404).send("User not found.")

    const { error } = validateUsers(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, firstName, lastName, password } = req.body

    try {
        const result = await user.update({ email, firstName, lastName, password })
        res.status(200).send(result)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

// ------------------------------------------------Delete Users----------------------------------------------------
exports.deletUser = async (req, res) => {
    const user = await findUserById(req.params.id)
    if (!user)
        return res.status(404).send("User not found.")

    try {
        await user.destroy()
        return res.status(200).send("Deleted successfully")
    } catch (error) {
        return res.status(400).send("Error in deleting user.")
    }
}