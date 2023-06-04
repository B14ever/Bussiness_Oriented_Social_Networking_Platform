const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
    recureter: { type: String, ref: "CompanyAccount", require: true },
    haveForm: { type: Boolean, default: false },
    applicants: [{
        applicant: {
            type: String,
            ref: "PersonalAccount",
        },
        cv: {
            type: String
        }
    }],
    jobTitle: {
        type: String,
        require: true
    },
    workType: {
        type: String,
        require: true
    },
    jobLocation: {
        type: String,
        require: true
    },
    jobType: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('Job', JobSchema)