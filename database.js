const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection

db.on('error', (error) => {
    console.error(error, 'connection error')
})

db.once('open', () => {
    console.log('database synced!')
})

module.exports = db
