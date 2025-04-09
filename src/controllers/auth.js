const User = require("../models/user");

const {AsyncHandler, ErrorHandler} = require("../utils/handlers");
const {validateSignUpData} = require("../utils/validation");


//Signup 

const signUp = AsyncHandler(async(req,res,next) => {

    const {firstName, lastName, password, age} = req.body;

    validateSignUpData(req.body);

    const user = await User.findOne({emailId});
    if(user){
        throw ErrorHandler("User already exists" , 409);
    }

    const newUser = await User.create({
        firstName,lastName,age,gender,password });

    newUser.password = undefined;

    res.status(201).json({
        success:true,
        message:"Registered Succesfully",
        data: newUser
    });
});


const login = AsyncHandler(async(req,res,next) => {

    const {emailId, password} = req.body;

    validateLogin(req.body);

    const user = await User.findOne({emailId});

    if(!user){
        throw new ErrorHandler("User does not exists", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ErrorHandler("Invalid credentials", 401);
    }

    const token = user.generateJWT();

    userExists.password = undefined;

    res.cookie("devTinderToken", token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),})
    .status(200)
    .json({
        success:true,
        message: "Logged in successfully",
        data: user
    });
});


const logout = AsyncHandler(async(req,res,next) => {

    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logout successful"
    });
})



module.exports =  { signUp, login, logout};