const mongoose = require('mongoose');
const Role = require('../../utils/type');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        default: Role.User
    }
}, {collection: 'users'});

module.exports = {
    userModel : mongoose.model('User', userSchema),
}