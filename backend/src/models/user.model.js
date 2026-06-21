const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    age: Number
})

const userModel = mongoose.model("usersdata", userSchema);

module.exports = userModel;