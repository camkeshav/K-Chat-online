const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const { generateToken } = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePicture } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please enter all the details")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }
    console.log(profilePicture)
    const user = await User.create({
        name,
        email,
        password,
        profilePicture,
    })
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("Failed to create user")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Email or password")
    }
})

const allUsers = asyncHandler(async (req, res) => {
    const keywords = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {}
    const user = await User.find(keywords).find({ _id: { $ne: req.user._id } })
    // console.log(user)
    // console.log(req._id)
    res.send(user)
})

module.exports = { registerUser, authUser, allUsers }