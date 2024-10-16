const mongoose = require('mongoose');

const validator = require('validator');



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Must be a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', userSchema);
