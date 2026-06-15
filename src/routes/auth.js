const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {validateSignUpData} = require('../utils/validation');

authRouter.post("/signup", async(req,res) => {
    try{
        const validationResult = validateSignUpData(req);

        if (!validationResult.valid) {
            throw new Error(validationResult.message);
        }
        
        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User( {
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        })
        console.log(user);

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token",token, {
            expires: new Date(Date.now() + 7*24*60*60*1000),
            httpOnly: true,
        });
        
        res.send("User created successfully");
    }catch(err){
        res.status(400).send("ERROR:htrhtrhrt " + err.message);
    }
});


authRouter.post("/login", async(req,res) => {
    try {
        const {emailId, password} = req.body;

        if(!emailId || !password){
            return res.status(400).send("Email and password are required");
        }

        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(!isPasswordValid){
            throw new Error("Invalid password");
        }

        const token  = await user.getJWT();
        
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7*24*60*60*1000),
            httpOnly: true,
        });
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});


authRouter.post("/logout", async(req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.send("Logged out successfully");
});




module.exports = authRouter;