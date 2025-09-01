const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    published: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
        index: true,
    },
    genres: {
        type: [String],
        required: true,
        default: [],
        index: true,
    }
})

schema.index({ author: 1, genres: 1})

module.exports = mongoose.model('Book', schema)