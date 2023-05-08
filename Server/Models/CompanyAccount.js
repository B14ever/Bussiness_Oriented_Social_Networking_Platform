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
    tagLine: {
        type: String,
    },
}, { timestamps: true })
module.exports = mongoose.model('CompanyAccount', CompanyAccount)