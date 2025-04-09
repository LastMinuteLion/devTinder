// src/config/database.js
const mongoose = require('mongoose');
const { dbUri } = require('./config');

const connectDb = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('✅ Database connection established successfully!');
    } catch (err) {
        console.error('❌ Failed to connect to the database:', err);
        throw err;
    }
};

module.exports = connectDb;