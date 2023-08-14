const { User } = require("../models/user_schema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userLogin = async (req, resp) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const user = await User.findOne({ username: username })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.username === username) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    console.log("Login Successful", req.body)
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
    console.log(req.body)
    const { username, password } = req.body

    const exist = await User.findOne({ username: username })
    if (exist) {
        resp.send({ "status": "failed", "message": "Username Already Exists" })
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
                const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                console.log("Registration Successful", req.body)
                resp.send({ "status": "success", "message": "Registration Success", "token": token })
            }
            catch (e) {
                console.log(e)
                resp.send({ "status": "failed", "message": "Unable to Register" })
            }
        }
        else {
            resp.send({ "status": "failed", "message": "All fields are Required" })
        }
    }
}

const changePassword = async (req, resp) => {
    console.log("Password Changed")
    resp.send("Password Changed")
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
module.exports = { userLogin, userRegistration, defaultPage, changePassword }
