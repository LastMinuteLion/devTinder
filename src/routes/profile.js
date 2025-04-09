const express = require('express');
const {userAuth} = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/view");
profileRouter.patch("/edit");
profileRouter.put("/password");

module.exports = profileRouter;