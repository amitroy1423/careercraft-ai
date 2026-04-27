const mongoose = require('mongoose');

async function connectToDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database");

    } catch (error) {
        console.log("Database connection failed", error);
    }
}

module.exports = connectToDB;