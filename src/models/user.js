const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address' + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Password is not strong enough');
            }
        }
    },
    age: {
        type: Number,
        // required: true,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: `{VALUE} is not a valid gender`
        }
        // required: true,
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid URL for photo');
            }
        }
    },
    about: {
        type: String,
        default: 'This is a default about section. Please update it to tell others more about you!'
    },
    skills: {
        type: [String],
        default: [],
        validate: {
            validator: function(arr){
                return arr.length <= 5
            },
            message: 'You can only add up to 5 skills.'
        }
    },
},
{
    timestamps: true
})

userSchema.methods.getJWT = async function(){
    const token = await jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}

userSchema.methods.validatePassword = async function(password){
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
}

const User = mongoose.model('User',userSchema);

module.exports = User;