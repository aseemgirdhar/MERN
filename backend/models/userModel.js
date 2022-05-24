const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//Send Types to backend
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,

        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        pic: {
            type: String,
            required: true,
            default: "https://placeimg.com/640/480/any"
        }
    },
    {
        timestamps: true,
    }
)

//To encrypt password
userSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

//To dcrypt password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;