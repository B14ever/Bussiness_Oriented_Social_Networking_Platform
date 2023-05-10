const mongoose = require('mongoose');
const PersonalAccount = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        require: true,
    },
    City: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    education: [{
        institution: {
            type: String
        },
        fildeOfStudy: {
            type: String
        },
        startedDate: {
            type: String
        },
        endDate: {
            type: String
        },
        Grade: {
            type: Number
        }

    }],
    exprience: [{
        worksAt: {
            type: String
        },
        position: {
            type: String
        },
    }],
    friends: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('PersonalAccount', PersonalAccount);