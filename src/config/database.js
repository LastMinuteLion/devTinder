const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("MONGO_URI =", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
};



module.exports = connectDB;