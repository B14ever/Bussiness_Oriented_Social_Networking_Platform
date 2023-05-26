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
    profilePhoto: {
        type: String,
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
        title: {
            type: String
        },
        employmentType: {
            type: String
        },
        companyName: {
            type: String
        },
        startedDate: {
            type: String
        },
        endDate: {
            type: String
        }
    }],
    skill: [{
        skillName: {
            type: String
        },
        badge: {
            type: Boolean,
            default: false
        }
    }],
    sentFriendRequest: [],
    recivedFriendRequest: [],
    friends: []
}, { timestamps: true });

module.exports = mongoose.model('PersonalAccount', PersonalAccount);