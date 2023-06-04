const mongoose = require('mongoose')
const CompanyAccount = new mongoose.Schema({
    companyName: {
        type: String,
        require: true
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
        require: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    organizationSize: {
        type: String,
        require: true
    },
    organizationType: {
        type: String,
        require: true
    },
    industry: {
        type: String,
        require: true
    },
    tagline: {
        type: String,
    },
    mission: {
        type: String
    },
    vision: {
        type: String
    },
    workes: [{
        title: {
            type: String
        },
        describtion: {
            type: String
        }
    }],
    logo: {
        type: String,
        default: 'defaultLogo.jpg'
    },
    followers: [{ type: String, ref: "PersonalAccount" }],
}, { timestamps: true })
module.exports = mongoose.model('CompanyAccount', CompanyAccount)