const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://HarshV05:GM37cRzklYxeK9ud@cluster0.iweyvpj.mongodb.net/devTinder");
};



module.exports = connectDB;