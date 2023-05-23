const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const { generateToken } = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, pass, pic } = req.body

    if (!name || !email || !pass) {
        res.status(400)
        throw new Error("Please enter all the details")
    }

    const userExists = await User.findone({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        pass,
        pic,
    })
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pass: user.pass,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("Failed to create user")
    }
})
module.exports = { registerUser }