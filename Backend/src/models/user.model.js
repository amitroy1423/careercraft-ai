const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username is already taken"]
    },

    email: {
        type: String,
        required: true,
        unique: [true, "Accout already exist with this email"],   
    },

    password: {
        type: String,
        required: true
    }
})

// creating schema using const mongoose.model(modelName, schema);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;