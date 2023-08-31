const { getUsers, findUserByEmail, createUser, findUserById } = require("../services/user.service")
const { validateUsers, validateUpdateUsersRequest } = require("../utils/requestValidations")
const transporter = require('../services/transporter.service');
const { getToken, verifyToken } = require("../services/jwt.service");
const { getMailOptions } = require("../services/mail.service");
const bcrypt = require("bcrypt")
require("dotenv").config()


// ------------------------------------------------Get All Users----------------------------------------------------
exports.readAll = async (req, res) => {
    try {
        const users = await getUsers()
        res.send(users)
    } catch (error) {
        res.status(400).send("Errors in fetching Users")
    }
}

// ------------------------------------------------Add New Users----------------------------------------------------
exports.create = async (req, res) => {
    const { error } = validateUsers(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const { email, firstName, lastName, password } = req.body
    let newUser = await findUserByEmail(email)
    if (newUser) return res.status(400).send("User already exists")

    try {
        const confirmationToken = getToken({ email });
        const confirmationLink = `${process.env.API_BASE_URI}users/confirm/${confirmationToken}`; // Replace with your frontend URL

        const mailOptions = getMailOptions(email, confirmationLink);
        newUser = await createUser({ email, firstName, lastName, password, isAdmin: false, isModerator: false })

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err,'error')
            else
                console.log(info,'info');
        });
        return res.status(200).send(newUser)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.confirmEmail = async (req, res) => {
    const token = req.params.token;
    try {
        const { email } = verifyToken(token);
        const user = await findUserByEmail(email);
        if (!user) throw new Error('User not found');

        user.isEmailConfirmed = true;
        await user.save();

        res.status(200).send('Email confirmed successfully.');
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
}

// ------------------------------------------------Update Users----------------------------------------------------
exports.update = async (req, res) => {
    console.log("called")
    const { email, firstName, lastName, oldPassword, password } = req.body
    const user = await findUserById(req.params.id)
    const prevEmail = user.email
    if (!user)
        return res.status(404).send("User not found.")

    const { error } = validateUpdateUsersRequest({ email, firstName, lastName })
    if (error) return res.status(400).send(error.details[0].message)

    if (oldPassword || password) {
        const result = await bcrypt.compare(oldPassword, user.password)
        if (result) return res.status(400).send("Invalid Old password")
    }

    try {
        const result = await user.update({ email, firstName, lastName, password: password ? password : user.password })
        if (email !== prevEmail) {
            const confirmationToken = getToken({ email });
            const confirmationLink = `${process.env.API_BASE_URI}users/confirm/${confirmationToken}`; // Replace with your frontend URL

            const mailOptions = getMailOptions(email, confirmationLink);
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    return res.status(400).send(err.message)
                else
                    console.log(info);
            });
            await user.update({ isEmailConfirmed: false })
            return res.status(200).send("Profile updated. Please activate changed emial")
        }
        else {
            const token = result.genAuthToken()
            res.status(200).send(token)
        }
    } catch (err) {
        return res.status(400).send(err.message)
    }
}




// ------------------------------------------------Delete Users----------------------------------------------------
exports.remove = async (req, res) => {
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

exports.toggleModeratorRole = async (req, res) => {
    let user = await findUserById(req.params.id)
    if (!user)
        return res.status(404).send("User not found.")

    try {
        user.isModerator = !user.isModerator
        user = await user.save()
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

