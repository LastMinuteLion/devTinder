const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid!");
        }

        const decodedObj = jwt.verify(token, "DEV@tinder"); // No need for `await` here
        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found.");
        }

        req.user = user; // Attach user to request for access in route
        next(); // Move to next middleware or route
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token. Please login again." });
    }
};

module.exports = {
    userAuth,
};
