const express = require('express');
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validation");

authRouter.post("/signup");
authRouter.post("/login");
authRouter.post("/logout");

module.exports = authRouter;