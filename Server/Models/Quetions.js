const mongoose = require('mongoose')
const QuestionSchema = new mongoose.Schema({
    typeOfStudy: {
        type: String,
        require: true
    },
    questions: [{
        question: {
            type: String,
            require: true
        },
        options: [{
            type: String,
            require: true
        }],
        correctAnswer: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        }
    }]
})
module.exports = mongoose.model('Question', QuestionSchema)