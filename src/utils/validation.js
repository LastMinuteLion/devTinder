const validator = require('validator');
const {ErrorHandler} = require("./handlers");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    // Name validations
    if (!firstName || !lastName) {
        throw new Error("First and Last name are required.");
    }

    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("First name should be between 4 and 50 characters.");
    }

    if (lastName.length < 1 || lastName.length > 50) {
        throw new Error("Last name should be between 1 and 50 characters.");
    }

    // Email validation
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email is not valid.");
    }

    // Password validation
    if (!password) {
        throw new Error("Password is required.");
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");
    }
};

const validateEditProfile = (data) => {
    const allowedFieldsToEdit = ["gender", "age", "about", "skills", "photoUrl"];
    const isAllowed = Object.keys(data).every((field) => allowedFieldsToEdit.includes(field));
    if (!isAllowed) {
        throw new ErrorHandler("Please provide the valid fields to edit", 400);
    }

    if (data?.skills?.length > 5) {
        throw new ErrorHandler("You can add up to 5 skills only", 400);
    }
};
module.exports = { validateSignUpData,validateEditProfile}