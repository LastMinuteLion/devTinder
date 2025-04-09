const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
});

// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

userSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET, // ✅ Use secret from env
        { expiresIn: "7d" }
    );
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// const User = mongoose.model("User",userSchema);

// module.exports = User;

module.exports = mongoose.model("User",userSchema);