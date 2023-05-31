const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true, default: "https://i.stack.imgur.com/l60Hf.png" },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enPass) {
    return await bcrypt.compare(enPass, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema)

module.exports = User