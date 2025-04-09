const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
    photoUrl:{
        type: String,
    },
    about:{
        type: String,
    },
    skills: {
        type:[String]
    }
},
{
    timestamps:true,
})

userSchema.methods.getJWT = async function () {

    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEV@tinder", {
        expiresIn: "1d",
    });
}

userSchema.method.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const isPasswordValid = await  bcrypt.compare(passwordInputByUser,this.password)

    return isPasswordValid;
}

// const User = mongoose.model("User",userSchema);

// module.exports = User;

module.exports = mongoose.model("User",userSchema);