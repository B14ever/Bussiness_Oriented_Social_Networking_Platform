const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema({
    recureter: { type: String, ref: "CompanyAccount", require: true },
    form: {
        type: String,
        require: true
    },
    applicants: [{
        applicant: {
            type: String,
            ref: "PersonalAccount",
        },
        cv: {
            type: String
        },
        accepetd: {
            type: Boolean,
            default: false
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
    jobRequirements: {
        type: String,
        require: true
    },
    jobResponsibilities: {
        type: String,
        require: true
    },
    webSite: {
        type: String,
    }
})
module.exports = mongoose.model('Job', JobSchema)