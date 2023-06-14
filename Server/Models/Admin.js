const mongoose = require('mongoose')
const AdminAccount = new mongoose.Schema({
    FirstName: {
        type: String,
        requier: true
    },
    LastName: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        requier: true
    },
    profilePhoto: {
        type: String,
        default: 'operator.jpg'
    },
    adminType: {
        type: String,
    },
    Country: {
        type: String,
        require: true,
    },
    City: {
        type: String,
        require: true,
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
}, { timestamps: true })
module.exports = mongoose.model('AdminAccount', AdminAccount)