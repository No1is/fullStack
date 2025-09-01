const mongoose = require('mongoose')

const defPass = 'password'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 8,
        unique: true,
    },
    favoriteGenre: {
        type: String,
        minLength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        default: defPass,
    },
})

module.exports = mongoose.model('LibraryUser', schema)