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
    }
}, { timestamps: true })
module.exports = mongoose.model('AdminAccount', AdminAccount)