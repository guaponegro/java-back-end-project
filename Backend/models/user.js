const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    location: {type: Number, required: true},
    logged_in: Boolean,
    id: String
});

module.exports = mongoose.model('User', UserSchema);