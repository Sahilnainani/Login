const { User } = require("../models/user_schema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_SECRET_KEY = "qwertyuiop1234567890"

const userLogin = async (req, resp) => {
    try {
        let { username, password } = req.body
        if (username && password) {
            // username=username.toLowerCase()
            const user = await User.findOne({ username: username })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, JWT_SECRET_KEY, { expiresIn: '5d' })
                    resp.send({ "status": "success", "message": "Login Success", "token": token })
                } else {
                    resp.send({ "status": "failed", "message": "Username or Password is not Valid" })
                }
            } else {
                resp.send({ "status": "failed", "message": "You are not a Registered User" })
            }
        } else {
            resp.send({ "status": "failed", "message": "All Fields are Required" })
        }
    } catch (error) {
        console.log(error)
        resp.send({ "status": "failed", "message": "Unable to Login" })
    }
}

const userRegistration = async (req, resp) => {
    let { username, password } = req.body
    // username=username.toLowerCase()
    const exist = await User.findOne({ username: username })
    if (exist) {
        resp.send({ "status": "failed", "message": "username already exists" })
    }
    else {
        if (username && password) {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const newUser = new User({
                    username: username,
                    password: hashPassword,
                })
                await newUser.save();
                const saved_user = await User.findOne({ username: username })
                const token = jwt.sign({ userID: saved_user._id },JWT_SECRET_KEY, { expiresIn: '5d' })
                resp.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
            }
            catch (e) {
                console.log(e)
                resp.send({ "status": "failed", "message": "Unable to Register" })
            }
        }
        else {
            resp.send({ "status": "failed", "message": "All fields are required" })
        }
    }
}
const defaultPage = async (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
}
module.exports = { userLogin, userRegistration, defaultPage }