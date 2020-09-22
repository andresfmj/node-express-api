const mongoose      = require('mongoose');

let userSchema = mongoose.Schema({
    friends: Array,
    hunterSelected: mongoose.ObjectId
})

let UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
