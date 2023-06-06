const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    authorName: {
        type: String,
    },
    authorPhoto: {
        type: String,
    },
    authorId: {
        type: String,
    },
    authorType: {
        type: String,
    },
    content: {
        type: String,
    },
    photo: {
        type: String,
    },

    like: [],
    report: []

}, { timestamps: true })
module.exports = mongoose.model('Posts', postSchema)