const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName || !emailId || !password){
        return {valid: false, message: 'All fields are required'};
    }

    if(firstName.length < 4 || firstName.length > 50){
        return {valid: false, message: 'First name must be between 4 and 50 characters'};
    }

    if(lastName.length < 4 || lastName.length > 50){
        return {valid: false, message: 'Last name must be between 4 and 50 characters'};
    }

    if(!validator.isEmail(emailId)){
        return {valid: false, message: 'Invalid email address'};
    }

    if(!validator.isStrongPassword(password)){
        return {valid: false, message: 'Password is not strong enough'};
    }

    return {valid: true};
};


const validateProfileData = (req) => {
    const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateProfileData
};