const mongoose      = require('mongoose');

const hunterSchema  = mongoose.Schema({
    user: mongoose.ObjectId,
    locked: Boolean,
    level: Number
})

let HunterModel = mongoose.model('Hunters', hunterSchema)

module.exports = HunterModel
