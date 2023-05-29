const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: String,
    },
    photo: {
        type: String,
    },
    comments: [{
        commenterID: {
            type: String
        },
        comment: {
            type: String
        },
        replays: [{
            replayerId: {
                type: String
            },
            replay: {
                type: String
            }
        }]
    }],
    Likes: {
        type: Number
    }

}, { timestamps: true })
module.exports = mongoose.model('Posts', postSchema)