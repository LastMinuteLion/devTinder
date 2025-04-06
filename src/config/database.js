const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(
        "mongodb+srv://harsh20033:HarshV2003!@cluster0.bnvtidp.mongodb.net/devTinder"
    );
};

module.exports = connectDb;

